const fs = require('fs');
const path = require('path');
const Buffer = require('Buffer');
class RequestController {
    constructor(data, socket) {
        this.socket = socket;
        this.dataBuffer = []; // Buffer to store incoming data chunks
        this.isHeaderComplete = false;
        this.bodyBuffer = Buffer.alloc(0);
        this.method = '';
        this.headers = {};
        this.data = data;
    }

    process() {
        if (!this.isHeaderComplete) {
            const dataStr = this.data.toString();
            const headerEndIndex = dataStr.indexOf("\r\n\r\n");
            const rawData = this.data.toString("hex");
            console.log(rawData);

            if (headerEndIndex !== -1) {
                // Extract headers and body
                this.isHeaderComplete = true;
                const headerPart = dataStr.slice(0, headerEndIndex);
                this.headers = this.parseHeaders(headerPart);
                this.method = this.extractMethod(headerPart);

                // Extract body if available
                const bodyPart = this.data.slice(headerEndIndex + 4);
                this.bodyBuffer = Buffer.concat([this.bodyBuffer, bodyPart]);

                // Handle remaining data
                this.dataBuffer.push(this.data);
            } else {
                // Accumulate more data if header end is not found
                this.dataBuffer.push(this.data);
                return;
            }
        } else {
            // Accumulate body data after headers are complete
            this.bodyBuffer = Buffer.concat([this.bodyBuffer, this.data]);
        }
        if (this.isHeaderComplete && this.dataBuffer.length > 0) {
            this.handleRequest();
        }
    }

    parseHeaders(headerPart) {
        return headerPart.split("\r\n")
            .slice(1) // Skip request line
            .reduce((acc, line) => {
                const [key, value] = line.split(": ");
                acc[key.toLowerCase()] = value;
                return acc;
            }, {});
    }

    extractMethod(headerPart) {
        const requestLine = headerPart.split("\r\n")[0];
        const [method] = requestLine.split(" ");
        return method;
    }

    saveToFile(filePath) {
        fs.writeFile(filePath, this.bodyBuffer, (err) => {
            if (err) {
                console.error("Error writing file:", err);
                this.socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
            } else {
                console.log("Data saved to file:", filePath);
                this.socket.write("HTTP/1.1 201 Created\r\n\r\n");
            }
            this.socket.end();
        });
    }

    handleRequest() {
        const method = this.method.toUpperCase();
        if (method === "PUT") {
            console.log("Method: ", this.data.toString());
            // Define the path where you want to save the file
            const filePath = path.join('uploaded_data');
            this.saveToFile(filePath);
        } else if (method === "GET") {
            // Handle GET requests
            if (this.data.toString().split("/media/titlegroups/")[0] != null) {
                this.socket.write("HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 320\r\n\r\n{\"blobs\":[{\"fileName\":\"foo\bar\blob.txt,binary\",\"clientFileTime\":\"2012-01-01T01:02:03.1234567Z\",\"displayName\":\"Friendly Name\",\"size\":12,\"etag\":\"0x8CEB3E4F8F3A5BF\"},{\"fileName\":\"foo\bar\blob2.txt,binary\",\"displayName\":\"Blob 2\",\"size\":4,\"etag\":\"0x8CEB3FE57F1A142\"},{\"fileName\":\"foo\jsonblob.txt,json\",\"size\":15,\"etag\":\"0x8CEB40152B4A6F8\"}],\"pagingInfo\":{\"continuationToken\":\"54\",}}");
            } else {
                this.socket.write("HTTP/1.1 200 OK\nContent-Length: 0\r\n\r\n");
            }
            this.socket.end();
        } else {
            // Handle unsupported methods
            this.socket.write("HTTP/1.1 405 Method Not Allowed\r\n\r\n");
            this.socket.end();
        }
    }
}

module.exports = RequestController;
