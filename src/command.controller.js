const crypto = require("crypto");
const Buffer = require("Buffer");
const Player = require("./player.controller");
const Utils = require("./libraries/Utils");
const utils = new Utils();

let lastType = "0";
let inGame = 0;
let token;
let min;
let max;
let params;
let callID;
let player;
//let userparams
class CommandController {
  constructor(data, socket) {
    this.action = data.substring(0, 4);
    this.message = data;
    this.clientSocket = socket;
  }

  process() {
    const osKey = crypto
      .createHash("sha256")
      .update(utils.getConfig().server.ip)
      .digest("hex")
      .slice(0, 32);

    utils.log(this.action + " | " + this.message, "info");
    switch (this.action) {
      case "@tic": {
        // if the tic and dir packet merge then respond.
        if (this.message.length > 23) {
          let dir = `@dir\0\0\0\0\0\0\0XADDR=${utils.getConfig().server.ip}\tPORT=${utils.getConfig().server.port}\tMASK=fffffffffffffffffffffffffffffffff\tSESS=1\0`;
          this.clientSocket.write(dir);
        }
        break;
      }
      case "@dir": {
        let dir = `@dir\0\0\0\0\0\0\0XADDR=${utils.getConfig().server.ip}\tPORT=${utils.getConfig().server.port}\tMASK=fffffffffffffffffffffffffffffffff\tSESS=1\0`;
        this.clientSocket.write(dir);
        break;
      }
      case "addr": {
        callID = 100;
        if (!this.message.includes("ADDR=")) break;
        player = new Player(this.message.split("ADDR=")[1].split("\x0a")[0]);
        var message = `~png\0\0\0\0\0\0\0#REF=${utils.getTime()}\0`;
        this.clientSocket.write(message);
        if (this.message.includes("SKEY=")) {
          this.clientSocket.write(
            utils.mergeBytes(
              `skey\0\0\0\0\0\0\0OSKEY=$${osKey}\tDP=XBL2/Burnout-Jan2008/mod\0news\0\0\0\0\0\0`,
              Buffer.from([0x0e, 0x0e], "utf16le"),
              `ROAD_RULES_RESET_DATE="2007.10.11 18:00:00"\tUSE_GLOBAL_ROAD_RULE_SCORES=0\tCAR_OLD_ROAD_RULES_TAGFIELD=RULES,RULES1,RULES2,RULES3,RULES4,RULES5,RULES6,RULES7,RULES8,RULES9,RULES10,RULES11,RULES12,RULES13,RULES14,RULES15,RULES16\tCAR_ROAD_RULES_TAGFIELD=RULES17\tBIKE_DAY_OLD_ROAD_RULES_TAGFIELD=BIKEDAYRULES1,BIKEDAYRULES2\tBIKE_DAY_ROAD_RULES_TAGFIELD=BIKEDAYRULES3\tBIKE_NIGHT_OLD_ROAD_RULES_TAGFIELD=BIKENIGHTRULES1,BIKENIGHTRULES2\tBIKE_NIGHT_ROAD_RULES_TAGFIELD=BIKENIGHTRULES3\tBUDDY_SERVER=127.0.0.1\tBUDDY_PORT=13505\tPEERTIMEOUT=10000\tTOS_URL=http://gos.ea.com/easo/editorial/common/2008/tos/tos.jsp?lang=%25s&platform=xbl2&from=%25s\tTOSA_URL=http://gos.ea.com/easo/editorial/common/2008/tos/tos.jsp?style=view&lang=%25s&platform=xbl2&from=%25s\tTOSAC_URL=http://gos.ea.com/easo/editorial/common/2008/tos/tos.jsp?style=accept&lang=%25s&platform=xbl2&from=%25s\tEACONNECT_WEBOFFER_URL=http://gos.ea.com/easo/editorial/common/2008/eaconnect/connect.jsp?site=easo&lkey=$LKEY$&lang=%25s&country=%25s\tGPS_REGIONS=127.0.0.1,127.0.0.1,127.0.0.1,127.0.0.1\tQOS_LOBBY=127.0.0.1\tQOS_PORT=17582\tPROFANE_STRING=@/&!\tFEVER_CARRIERS=FritzBraun,EricWimp,Matazone,NutKC,FlufflesDaBunny,Flinnster,Molen,LingBot,DDangerous,Technocrat,The%20PLB,Chipper1977,Bazmobile,CustardKid,The%20Wibbler,AlexBowser,Blanks%2082,Maxreboh,Jackhamma,MajorMajorMajor,Riskjockey,ChiefAV,Charnjit,Zietto,BurntOutDave,Belj,Cupster,Krisis1969,OrangeGopher,Phaigoman,Drastic%20Surgeon,Tom%20Underdown,Discodoktor,Cargando,Gaztech,PompeyPaul,TheSoldierBoy,louben17,Colonel%20Gambas,EliteBeatAgent,Uaintdown,SynergisticFX,InfamousGRouse,EAPR,EAPR%2002,Jga360%20JP2,EAJproduct\tNEWS_DATE="2008.6.11 21:00:00"\tNEWS_URL=http://gos.ea.com/easo/editorial/common/2008/news/news.jsp?lang=%25s&from=%25s&game=Burnout&platform=xbl2\tUSE_ETOKEN=1\tLIVE_NEWS2_URL=http://portal.burnoutweb.ea.com/loading.php?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s\tLIVE_NEWS_URL=https://gos.ea.com/easo/editorial/Burnout/2008/livedata/main.jsp?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s\tSTORE_URL_ENCRYPTED=1\tSTORE_URL=https://pctrial.burnoutweb.ea.com/t2b/page/index.php?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s\tAVATAR_URL_ENCRYPTED=1\tAVATAR_URL=https://31.186.250.154:8443/avatar?persona=%25s\tBUNDLE_PATH=https://gos.ea.com/easo/editorial/Burnout/2008/livedata/bundle/\tETOKEN_URL=https://31.186.250.154:8443/easo/editorial/common/2008/nucleus/nkeyToNucleusEncryptedToken.jsp?nkey=%25s&signature=%25s\tPRODUCT_DETAILS_URL=https://pctrial.burnoutweb.ea.com/t2b/page/ofb_pricepoints.php?productId=%25s&env=live\tPRODUCT_SEARCH_URL=https://pctrial.burnoutweb.ea.com/t2b/page/ofb_DLCSearch.php?env=live\tSTORE_DLC_URL=https://pctrial.burnoutweb.ea.com/t2b/page/index.php?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s&prodid=%25s\tAVAIL_DLC_URL=https://gos.ea.com/easo/editorial/Burnout/2008/livedata/Ents.txt\tROAD_RULES_SKEY=frscores\tCHAL_SKEY=chalscores\tTELE_DISABLE=AD,AF,AG,AI,AL,AM,AN,AO,AQ,AR,AS,AW,AX,AZ,BA,BB,BD,BF,BH,BI,BJ,BM,BN,BO,BR,BS,BT,BV,BW,BY,BZ,CC,CD,CF,CG,CI,CK,CL,CM,CN,CO,CR,CU,CV,CX,DJ,DM,DO,DZ,EC,EG,EH,ER,ET,FJ,FK,FM,FO,GA,GD,GE,GF,GG,GH,GI,GL,GM,GN,GP,GQ,GS,GT,GU,GW,GY,HM,HN,HT,ID,IL,IM,IN,IO,IQ,IR,IS,JE,JM,JO,KE,KG,KH,KI,KM,KN,KP,KR,KW,KY,KZ,LA,LB,LC,LI,LK,LR,LS,LY,MA,MC,MD,ME,MG,MH,ML,MM,MN,MO,MP,MQ,MR,MS,MU,MV,MW,MY,MZ,NA,NC,NE,NF,NG,NI,NP,NR,NU,OM,PA,PE,PF,PG,PH,PK,PM,PN,PS,PW,PY,QA,RE,RS,RW,SA,SB,SC,SD,SG,SH,SJ,SL,SM,SN,SO,SR,ST,SV,SY,SZ,TC,TD,TF,TG,TH,TJ,TK,TL,TM,TN,TO,TT,TV,TZ,UA,UG,UM,UY,UZ,VA,VC,VE,VG,VN,VU,WF,WS,YE,YT,ZM,ZW,ZZ\0`
            )
          );
        }
        break;
      }
      case "skey": {
        if (!this.message.includes("SKEY=")) break;
        this.clientSocket.write(
          utils.mergeBytes(
            `skey\0\0\0\0\0\0\0OSKEY=$${osKey}\tDP=XBL2/Burnout-Jan2008/mod\0news\0\0\0\0\0\0`,
            Buffer.from([0x0e, 0x0e], "utf16le"),
            `ROAD_RULES_RESET_DATE="2007.10.11 18:00:00"\tUSE_GLOBAL_ROAD_RULE_SCORES=0\tCAR_OLD_ROAD_RULES_TAGFIELD=RULES,RULES1,RULES2,RULES3,RULES4,RULES5,RULES6,RULES7,RULES8,RULES9,RULES10,RULES11,RULES12,RULES13,RULES14,RULES15,RULES16\tCAR_ROAD_RULES_TAGFIELD=RULES17\tBIKE_DAY_OLD_ROAD_RULES_TAGFIELD=BIKEDAYRULES1,BIKEDAYRULES2\tBIKE_DAY_ROAD_RULES_TAGFIELD=BIKEDAYRULES3\tBIKE_NIGHT_OLD_ROAD_RULES_TAGFIELD=BIKENIGHTRULES1,BIKENIGHTRULES2\tBIKE_NIGHT_ROAD_RULES_TAGFIELD=BIKENIGHTRULES3\tBUDDY_SERVER=127.0.0.1\tBUDDY_PORT=13505\tPEERTIMEOUT=10000\tTOS_URL=http://gos.ea.com/easo/editorial/common/2008/tos/tos.jsp?lang=%25s&platform=xbl2&from=%25s\tTOSA_URL=http://gos.ea.com/easo/editorial/common/2008/tos/tos.jsp?style=view&lang=%25s&platform=xbl2&from=%25s\tTOSAC_URL=http://gos.ea.com/easo/editorial/common/2008/tos/tos.jsp?style=accept&lang=%25s&platform=xbl2&from=%25s\tEACONNECT_WEBOFFER_URL=http://gos.ea.com/easo/editorial/common/2008/eaconnect/connect.jsp?site=easo&lkey=$LKEY$&lang=%25s&country=%25s\tGPS_REGIONS=127.0.0.1,127.0.0.1,127.0.0.1,127.0.0.1\tQOS_LOBBY=127.0.0.1\tQOS_PORT=17582\tPROFANE_STRING=@/&!\tFEVER_CARRIERS=FritzBraun,EricWimp,Matazone,NutKC,FlufflesDaBunny,Flinnster,Molen,LingBot,DDangerous,Technocrat,The%20PLB,Chipper1977,Bazmobile,CustardKid,The%20Wibbler,AlexBowser,Blanks%2082,Maxreboh,Jackhamma,MajorMajorMajor,Riskjockey,ChiefAV,Charnjit,Zietto,BurntOutDave,Belj,Cupster,Krisis1969,OrangeGopher,Phaigoman,Drastic%20Surgeon,Tom%20Underdown,Discodoktor,Cargando,Gaztech,PompeyPaul,TheSoldierBoy,louben17,Colonel%20Gambas,EliteBeatAgent,Uaintdown,SynergisticFX,InfamousGRouse,EAPR,EAPR%2002,Jga360%20JP2,EAJproduct\tNEWS_DATE="2008.6.11 21:00:00"\tNEWS_URL=http://gos.ea.com/easo/editorial/common/2008/news/news.jsp?lang=%25s&from=%25s&game=Burnout&platform=xbl2\tUSE_ETOKEN=1\tLIVE_NEWS2_URL=http://portal.burnoutweb.ea.com/loading.php?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s\tLIVE_NEWS_URL=https://gos.ea.com/easo/editorial/Burnout/2008/livedata/main.jsp?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s\tSTORE_URL_ENCRYPTED=1\tSTORE_URL=https://pctrial.burnoutweb.ea.com/t2b/page/index.php?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s\tAVATAR_URL_ENCRYPTED=1\tAVATAR_URL=https://31.186.250.154:8443/avatar?persona=%25s\tBUNDLE_PATH=https://gos.ea.com/easo/editorial/Burnout/2008/livedata/bundle/\tETOKEN_URL=https://31.186.250.154:8443/easo/editorial/common/2008/nucleus/nkeyToNucleusEncryptedToken.jsp?nkey=%25s&signature=%25s\tPRODUCT_DETAILS_URL=https://pctrial.burnoutweb.ea.com/t2b/page/ofb_pricepoints.php?productId=%25s&env=live\tPRODUCT_SEARCH_URL=https://pctrial.burnoutweb.ea.com/t2b/page/ofb_DLCSearch.php?env=live\tSTORE_DLC_URL=https://pctrial.burnoutweb.ea.com/t2b/page/index.php?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s&prodid=%25s\tAVAIL_DLC_URL=https://gos.ea.com/easo/editorial/Burnout/2008/livedata/Ents.txt\tROAD_RULES_SKEY=frscores\tCHAL_SKEY=chalscores\tTELE_DISABLE=AD,AF,AG,AI,AL,AM,AN,AO,AQ,AR,AS,AW,AX,AZ,BA,BB,BD,BF,BH,BI,BJ,BM,BN,BO,BR,BS,BT,BV,BW,BY,BZ,CC,CD,CF,CG,CI,CK,CL,CM,CN,CO,CR,CU,CV,CX,DJ,DM,DO,DZ,EC,EG,EH,ER,ET,FJ,FK,FM,FO,GA,GD,GE,GF,GG,GH,GI,GL,GM,GN,GP,GQ,GS,GT,GU,GW,GY,HM,HN,HT,ID,IL,IM,IN,IO,IQ,IR,IS,JE,JM,JO,KE,KG,KH,KI,KM,KN,KP,KR,KW,KY,KZ,LA,LB,LC,LI,LK,LR,LS,LY,MA,MC,MD,ME,MG,MH,ML,MM,MN,MO,MP,MQ,MR,MS,MU,MV,MW,MY,MZ,NA,NC,NE,NF,NG,NI,NP,NR,NU,OM,PA,PE,PF,PG,PH,PK,PM,PN,PS,PW,PY,QA,RE,RS,RW,SA,SB,SC,SD,SG,SH,SJ,SL,SM,SN,SO,SR,ST,SV,SY,SZ,TC,TD,TF,TG,TH,TJ,TK,TL,TM,TN,TO,TT,TV,TZ,UA,UG,UM,UY,UZ,VA,VC,VE,VG,VN,VU,WF,WS,YE,YT,ZM,ZW,ZZ\0`
          )
        );
        break;
      }
      case "~png": {
        break;
      }
      case "sele": {
        if (!this.message.includes("MESGTYPES=")) {
          inGame =
            inGame +
            parseInt(this.message.split("INGAME=")[1].split("\x0a")[0]);
          // Game returns msgType P from either here or 100.
          // Which is confusing.
          this.clientSocket.write(
            utils.mergeBytes(
              `sele\0\0\0\0\0\0\0`,
              Buffer.from([0x92], "utf16le"),
              `GAMES=0\tMYGAME=0\tUSERS=0\tROOMS=0\tUSERSETS=0\tMESGS=1\tMESGTYPES=${lastType}\tASYNC=0\tCTRL=0\tSTATS=0\tSLOTS=280\tINGAME=${inGame}\tDP=XBL2/Burnout-Jan2008/mod\0`
            )
          );
        } else {
          let msgType = this.message
            .split("MESGTYPES=")[1]
            .substring(0, 3)
            .replace(" ", "")
            .replace("\x0A", "")
            .replace("\x53", "");
          // Pre-Login?
          if (msgType == "100") {
            let mygame = this.message
              .split(" ")[0]
              .split("MYGAME=")[1]
              .split(" ")[0];
            let games = this.message
              .split(" ")[1]
              .split("GAMES=")[1]
              .split(" ")[0];
            let rooms = this.message
              .split(" ")[2]
              .split("ROOMS=")[1]
              .split(" ")[0];
            let users = this.message
              .split(" ")[3]
              .split("USERS=")[1]
              .split(" ")[0];
            let mesgs = this.message
              .split(" ")[4]
              .split("MESGS=")[1]
              .split(" ")[0];
            let stats = this.message
              .split(" ")[6]
              .split("STATS=")[1]
              .split(" ")[0];
            let ranks = this.message
              .split(" ")[7]
              .split("RANKS=")[1]
              .split(" ")[0];
            let usersets = this.message
              .split(" ")[8]
              .split("USERSETS=")[1]
              .split("\0")[0];

            this.clientSocket.write(
              utils.mergeBytes(
                "sele\0\0\0\0\0\0\0",
                Buffer.from([0xe5], "utf16le"),
                `GAMES=0\tMYGAME="${mygame} GAMES=${games} ROOMS=${rooms} USERS=${users} MESGS=${mesgs} MESGTYPES=100728964 STATS=${stats} RANKS=${ranks} USERSETS=${usersets}"\tUSERS=0\tROOMS=0\tUSERSETS=0\tMESGS=0\tMESGTYPES=${lastType}\tASYNC=0\tCTRL=0\tSTATS=0\tSLOTS=280\tINGAME=0\tDP=XBL2/Burnout-Jan2008/mod\0`
              )
            );
          }
          // Login?
          else if (msgType == "GPY") {
            inGame = parseInt(
              this.message.split("INGAME=")[1].split("\x0a")[0]
            );
            let mesgs = this.message.split("MESGS=")[1].split("\x0a")[0];
            let users = this.message.split("USERS=")[1].split("\x0a")[0];
            let games = this.message.split("GAMES=")[1].split("\x0a")[0];
            let mygame = this.message.split("MYGAME=")[1].split("\x0a")[0];
            let rooms = this.message.split("ROOMS=")[1].split("\x0a")[0];
            let usersets = this.message.split("USERSETS=")[1].split("\x0a")[0];
            let stats = this.message.split("STATS=")[1].split("\x0a")[0];

            // We ONLY change lastType before being called if its still 0
            if (lastType == "0") lastType = "GPY";

            this.clientSocket.write(
              utils.mergeBytes(
                `sele\0\0\0\0\0\0\0`,
                Buffer.from([0x94], "utf16le"),
                `GAMES=${games}\tMYGAME=${mygame}\tUSERS=${users}\tROOMS=${rooms}\tUSERSETS=${usersets}\tMESGS=${mesgs}\tMESGTYPES=${lastType}\tASYNC=0\tCTRL=0\tSTATS=${stats}\tSLOTS=280\tINGAME=${inGame}\tDP=XBL2/Burnout-Jan2008/mod\0`
              )
            );
            lastType = "GPY";
          }
          // Ingame?
          else if (msgType == "P") {
            // We ONLY change lastType before being called if its still GPY
            if (lastType == "GPY") lastType = "P";

            let games = this.message.split("GAMES=")[1].split("\x0a")[0];
            let myGames = this.message.split("MYGAME=")[1].split("\x0a")[0];
            let users = this.message.split("USERS=")[1].split("\x0a")[0];
            let rooms = this.message.split("ROOMS=")[1].split("\x0a")[0];
            let mesgs = this.message.split("MESGS=")[1].split("\x0a")[0];
            let usersets = this.message.split("USERSETS=")[1].split("\x0a")[0];
            inGame = parseInt(
              this.message.split("INGAME=")[1].split("\x0a")[0]
            );
            let stats = this.message.split("STATS=")[1].split("\x0a")[0];
            this.clientSocket.write(
              utils.mergeBytes(
                `sele\0\0\0\0\0\0\0`,
                Buffer.from([0x92], "utf16le"),
                `GAMES=${games}\tMYGAME=${myGames}\tUSERS=${users}\tROOMS=${rooms}\tUSERSETS=${usersets}\tMESGS=${mesgs}\tMESGTYPES=${lastType}\tASYNC=0\tCTRL=0\tSTATS=${stats}\tSLOTS=280\tINGAME=${inGame}\tDP=XBL2/Burnout-Jan2008/mod\0`
              )
            );
            lastType = "P";
          } else {
            utils.log(`Unhandled sele ${msgType}`, "warn");
          }
        }

        break;
      }
      case "auth": {
        // Needs its own player object
        player.setGamertag(this.message.split("GTAG=")[1].split("\x0a")[0]);
        player.setXUID(
          this.message
            .split("XUID=")[1]
            .split("\x0a")[0]
            .replace("$", "")
            .toUpperCase()
        );
        player.setUID();
        token = player.getAuthToken();

        utils.log(
          `${player.getGamertag()}(XUID -> ${player.getXUID()}) joined with the IP: ${player.getAddr()}`
        );

        this.clientSocket.write(
          utils.mergeBytes(
            `auth\0\0\0\0\0\0`,
            Buffer.from([0x01, 0x94], "utf16le"),
            `LAST=2018.1.1-00:00:00\tTOS=1\tSHARE=1\t_LUID=$${player.getUID()}\tNAME=${player.getGamertag()}\tPERSONAS=${player.getGamertag()}\tMAIL=mail@example.com\tBORN=19700101\tFROM=GB\tLOC=enGB\tSPAM=YN\tSINCE=2008.1.1-00:00:00\tGFIDS=1\tADDR=${player.getAddr()}\tTOKEN=${token}0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000.\0`
          )
        );

        break;
      }
      case "pers": {
        player.setMAddr(this.message.split("MADDR=")[1].split("^")[0]);
        // KNAME and GNAME
        this.clientSocket.write(
          utils.mergeBytes(
            `pers\0\0\0\0\0\0`,
            Buffer.from([0x01], "utf16le"),
            `KNAME=${player.getGamertag()}\tPERS=${player.getGamertag()}\tLAST=2018.1.1-00:00:00\tPLAST=2018.1.1-00:00:00\tSINCE=2008.1.1-00:00:00\tPSINCE=2008.1.1-00:00:00\tLKEY=000000000000000000000000000.\tSTAT=,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\tLOC=enGB\tA=${player.getAddr()}\tMA=`,
            player.getMacAddr(),
            `\tLA=${player.getAddr()}\tIDLE=50000\0`
          )
        );
        break;
      }
      case "news": {
        // incase skey sends news seperate
        if (
          this.message ==
          "\x6e\x65\x77\x73\x00\x00\x00\x00\x00\x00\x00\x14\x4e\x41\x4d\x45\x3d\x38\x0a\x00"
        ) {
          this.clientSocket.write(
            utils.mergeBytes(
              "newsnew8\0\0",
              Buffer.from([0x02, 0x91], "utf16le"),
              utils.getCrumbs("news"),
              "\0"
            )
          );

          this.clientSocket.write(
            utils.mergeBytes(
              `+who\0\0\0\0\0\0\0`,
              Buffer.from([0xef], "utf16le"),
              `I=${callID}\tN=${player.getGamertag()}\tM=${player.getGamertag()}\tF=U\tA=${player.getAddr()}\tP=1\tS=,,\tG=0\tAT=\tCL=511\tLV=1049601\tMD=0\tLA=${player.getAddr()}\tHW=0\tRP=0\tMA=`,
              player.getMacAddr(),
              "\tLO=enGB\tX=\tUS=0\tPRES=1\tVER=7\tC=,,,,,,,,\0"
            )
          );
        }
        break;
      }
      case "usld": {
        let crumb = utils
          .getCrumbs("usld")
          .replace("0000000000000000", "$" + player.getUID());

        this.clientSocket.write(
          utils.mergeBytes(
            `usld\0\0\0\0\0\0\0`,
            Buffer.from([0xc5], "utf16le"),
            crumb,
            "\0"
          )
        );
        break;
      }
      // This could be related to the menus glitch
      case "slst": {
        this.clientSocket.write(
          utils.mergeBytes(
            `slst\0\0\0\0\0\0`,
            Buffer.from([0x04], "utf16le"),
            `)`,
            utils.getCrumbs("slst"),
            `\0`
          )
        );
        break;
      }
      case "sviw": {
        // DLC related (i think)
        this.clientSocket.write(
          utils.mergeBytes(
            "sviw\0\0\0\0\0\0",
            Buffer.from([0x01, 0x17], "utf16le"),
            "N=13\tNAMES=0,3,4,5,6,7,8,9,10,11,12,13,14\tDESCS=1,1,1,1,1,1,1,1,1,1,1,1,1\tPARAMS=2,2,2,2,2,2,2,2,2,2,2,2,2\tTYPES=~num,~num,~num,~num,~num,~rnk,~num,~num,~num,~num,~num,~num\tSYMS=TOTCOM,a,0,TAKEDNS,RIVALS,ACHIEV,FBCHAL,RANK,WINS,unk7,unk8,unk9,unk10,unk11,unk12\tSS=83\0"
          )
        );
        break;
      }
      case "sdta": {
        this.clientSocket.write(
          utils.mergeBytes(
            "sdta\0\0\0\0\0\0\0",
            Buffer.from([0x37], "utf16le"),
            "SLOT=0\tSTATS=1,2,3,4,5,6,7,8,9,10,11,12,13\0"
          )
        );
        break;
      }
      case "gpsc": {
        this.clientSocket.write(
          utils.mergeBytes(
            "gpsc\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        //userparams = this.message.split("USERPARAMS=")[1].split("\x0a")[0];
        min = this.message.split("MINSIZE=")[1].split("\x0a")[0];
        max = this.message.split("MAXSIZE=")[1].split("\x0a")[0];
        params = this.message.split("PARAMS=")[1].split("\x0a")[0];

        this.clientSocket.write(
          utils.mergeBytes(
            `+who\0\0\0\0\0\0\0`,
            Buffer.from([0xf0], "utf16le"),
            `I=${callID}\tN=${player.getGamertag()}\tM=${player.getGamertag()}\tF=U\tA=${player.getAddr()}\tP=1\tS=,,\tG=73\tAT=\tCL=511\tLV=1049601\tMD=0\tLA=${player.getAddr()}\tHW=0\tRP=0\tMA=`,
            player.getMacAddr(),

            `\tLO=enGB\tX=\tUS=0\tPRES=1\tVER=7\tC=,,,,,,,,\0+mgm\0\0\0\0\0\0`,
            Buffer.from([0x02, 0xcd], "utf16le"),
            `IDENT=73\tWHEN=2024.6.28-8:56:26\tNAME=${player.getGamertag()}\tHOST=@brobot948\tROOM=0\tMAXSIZE=${max}\tMINSIZE=${min}\tCOUNT=2\tPRIV=0\tCUSTFLAGS=413345024\tSYSFLAGS=64\tEVID=0\tEVGID=0\tNUMPART=1\tSEED=73\tGPSHOST=${player.getGamertag()}\tGPSREGION=0\tGAMEMODE=0\tGAMEPORT=3074\tVOIPPORT=0\tWHENC=2024.6.28-8:56:26\tSESS=None\tPLATPARAMS=None\tPARTSIZE0=9\tPARAMS=${params}\tPARTPARAMS0=\tOPPO0=@brobot948\tOPPART0=0\tOPFLAG0=0\tPRES0=0\tOPID0=${callID}\tADDR0=${utils.getConfig().server.ip}\tLADDR0=127.0.0.3\tMADDR0=\tOPPARAM0=PUSMC1A3????,,c0-1,,,a,,,3a54e32a\tOPPO1=${player.getGamertag()}\tOPPART1=0\tOPFLAG1=413345024\tPRES1=0\tOPID1=${callID}\tADDR1=${player.getAddr()}\tLADDR1=${player.getAddr()}\tMADDR1=`,
            player.getMacAddr(),
            `\tOPPARAM1=PUSMC1A3????,,c00,,,a,,,3a54e32a\0\0`
          )
        );
        break;
      }
      case "hchk": {
        this.clientSocket.write(
          utils.mergeBytes(
            "hchk\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        this.clientSocket.write(
          utils.mergeBytes(
            `+who\0\0\0\0\0\0\0`,
            Buffer.from([0xf0], "utf16le"),
            `I=${callID}\tN=${player.getGamertag()}\tM=${player.getGamertag()}\tF=U\tA=${player.getAddr()}\tP=1\tS=,,\tG=73\tAT=\tCL=511\tLV=1049601\tMD=0\tLA=${player.getAddr()}\tHW=0\tRP=0\tMA=`,
            player.getMacAddr(),
            "\tLO=enGB\tX=\tUS=0\tPRES=1\tVER=7\tC=,,,,,,,,\0"
          )
        );
        break;
      }
      case "gset": {
        // MUST be 791 bytes
        this.clientSocket.write(
          utils.mergeBytes(
            `gset\0\0\0\0\0\0`,
            Buffer.from([0x03, 0x17], "utf16le"),
            `IDENT=73\tWHEN=2024.6.28-8:56:26\tNAME=${player.getGamertag()}\tHOST=@brobot948\tROOM=0\tMAXSIZE=${max}\tMINSIZE=${min}\tCOUNT=2\tPRIV=0\tCUSTFLAGS=413345024\tSYSFLAGS=64\tEVID=0\tEVGID=0\tNUMPART=1\tSEED=73\tGPSHOST=${player.getGamertag()}\tGPSREGION=0\tGAMEMODE=0\tGAMEPORT=3074\tVOIPPORT=0\tWHENC=2024.6.28-8:56:26\tSESS=$`,
            Buffer.from(
              [
                0xc4, 0xdc, 0xd0, 0xa7, 0xc9, 0xc8, 0x8b, 0xfa, 0x94, 0x99,
                0x82, 0x85, 0xa0, 0x84, 0xd2, 0x8e, 0x86, 0xc5, 0x80, 0x90,
                0x82, 0xa9, 0x87, 0xc3, 0xa2, 0x80, 0x80, 0x80, 0x80, 0x80,
                0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80,
                0x80, 0x80, 0x80, 0x82, 0x88, 0x98, 0xc0, 0xa0, 0x81, 0x83,
                0x87, 0x90, 0xa4, 0xd0, 0xb0, 0x81, 0xc3, 0x86, 0x8e, 0x9e,
                0x80, 0xae, 0x81, 0xdc, 0x88, 0xa5, 0xe4, 0xde, 0xb0, 0xb6,
                0x80
              ],
              "utf16le"
            ),
            `\tPLATPARAMS=`,
            Buffer.from(
              [0xfb, 0xf3, 0xe3, 0xf3, 0xb6, 0xbc, 0xcd, 0xf1, 0xab, 0x80],
              "utf16le"
            ),
            `\tPARTSIZE0=9\tPARAMS=${params}\tPARTPARAMS0=\tOPPO0=@brobot948\tOPPART0=0\tOPFLAG0=0\tPRES0=0\tOPID0=948\tADDR0=${utils.getConfig().server.ip}\tLADDR0=127.0.0.3\tMADDR0=\tOPPARAM0=PUSMC1A3????,,c0-1,,,a,,,3a54e32a\tOPPO1=${player.getGamertag()}\tOPPART1=0\tOPFLAG1=413345024\tPRES1=0\tOPID1=${callID}\tADDR1=${player.getAddr()}\tLADDR1=${player.getAddr()}\tMADDR1=`,
            player.getMacAddr(),
            "\tOPPARAM1=PUSMC1A3????,,c00,,,a,,,3a54e32a\0\0"
          )
        );
        this.clientSocket.write(
          utils.mergeBytes(
            `+mgm\0\0\0\0\0\0`,
            Buffer.from([0x03, 0x17], "utf16le"),
            `IDENT=73\tWHEN=2024.6.28-8:56:26\tNAME=${player.getGamertag()}\tHOST=@brobot948\tROOM=0\tMAXSIZE=${max}\tMINSIZE=${min}\tCOUNT=2\tPRIV=0\tCUSTFLAGS=413345024\tSYSFLAGS=64\tEVID=0\tEVGID=0\tNUMPART=1\tSEED=73\tGPSHOST=${player.getGamertag()}\tGPSREGION=0\tGAMEMODE=0\tGAMEPORT=3074\tVOIPPORT=0\tWHENC=2024.6.28-8:56:26\tSESS=$`,
            Buffer.from(
              [
                0xc4, 0xdc, 0xd0, 0xa7, 0xc9, 0xc8, 0x8b, 0xfa, 0x94, 0x99,
                0x82, 0x85, 0xa0, 0x84, 0xd2, 0x8e, 0x86, 0xc5, 0x80, 0x90,
                0x82, 0xa9, 0x87, 0xc3, 0xa2, 0x80, 0x80, 0x80, 0x80, 0x80,
                0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80,
                0x80, 0x80, 0x80, 0x82, 0x88, 0x98, 0xc0, 0xa0, 0x81, 0x83,
                0x87, 0x90, 0xa4, 0xd0, 0xb0, 0x81, 0xc3, 0x86, 0x8e, 0x9e,
                0x80, 0xae, 0x81, 0xdc, 0x88, 0xa5, 0xe4, 0xde, 0xb0, 0xb6,
                0x80
              ],
              "utf16le"
            ),
            `\tPLATPARAMS=`,
            Buffer.from(
              [0xfb, 0xf3, 0xe3, 0xf3, 0xb6, 0xbc, 0xcd, 0xf1, 0xab, 0x80],
              "utf16le"
            ),
            `\tPARTSIZE0=9\tPARAMS=${params}\tPARTPARAMS0=\tOPPO0=@brobot948\tOPPART0=0\tOPFLAG0=0\tPRES0=0\tOPID0=948\tADDR0=${utils.getConfig().server.ip}\tLADDR0=127.0.0.3\tMADDR0=\tOPPARAM0=PUSMC1A3????,,c0-1,,,a,,,3a54e32a\tOPPO1=${player.getGamertag()}\tOPPART1=0\tOPFLAG1=413345024\tPRES1=0\tOPID1=${callID}\tADDR1=${player.getAddr()}\tLADDR1=${player.getAddr()}\tMADDR1=`,
            player.getMacAddr(),
            "\tOPPARAM1=PUSMC1A3????,,c00,,,a,,,3a54e32a\0\0"
          )
        );
        break;
      }
      case "rent": {
        this.clientSocket.write(
          `rent\0\0\0\0\0\0\0"$CALLUSER=${callID}\tGFIDS=0\0`
        );
        break;
      }
      case "rrlc": {
        this.clientSocket.write(
          utils.mergeBytes(
            "rrlciper\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        break;
      }
      case "rrgt": {
        this.clientSocket.write(
          utils.mergeBytes(
            "rrgtiper\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        break;
      }
      case "gdel": {
        this.clientSocket.write(
          utils.mergeBytes(
            "gdel\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        this.clientSocket.write(
          utils.mergeBytes(
            `+who\0\0\0\0\0\0\0`,
            Buffer.from([0xf0], "utf16le"),
            `I=${callID}\tN=${player.getGamertag()}\tM=${player.getGamertag()}\tF=U\tA=${player.getAddr()}\tP=1\tS=,,\tG=73\tAT=\tCL=511\tLV=1049601\tMD=0\tLA=${player.getAddr()}\tHW=0\tRP=0\tMA=`,
            player.getMacAddr(),

            "\tLO=enGB\tX=\tUS=0\tPRES=1\tVER=7\tC=,,,,,,,,\0+mgm\0\0\0\0\0\0",
            Buffer.from([0x02, 0xcd], "utf16le"),
            "IDENT=73\0"
          )
        );
        break;
      }
      case "fbst": {
        this.clientSocket.write(
          "fbst\0\0\0\0\0\0\0",
          Buffer.from([0x0d], "utf16le"),
          "\0"
        );
        break;
      }
      case "opup": {
        this.clientSocket.write(
          utils.mergeBytes(
            "opup\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        break;
      }
      case "rrup": {
        this.clientSocket.write(
          utils.mergeBytes(
            "rrup\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        break;
      }
      // Used to insta join game
      case "gqwk": {
        utils.log("gqwk packet! " + this.message, "info");
        this.clientSocket.write(
          utils.mergeBytes(
            "gqwknfnd\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        break;
      }
      // Leaderboards
      case "cate": {
        this.clientSocket.write(
          utils.mergeBytes(
            "cate\0\0\0\0\0\0\0NSS=18\tSYMS=TEST1,TEST2,TEST3\tCC=1\tIC=1\tVC=1\tR=0,1,1,1,2,0,0\tU=1,2\0"
          )
        );
        break;
      }
      case "snap": {
        this.clientSocket.write(
          utils.mergeBytes(
            "snap\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        break;
      }
      case "gsea": {
        this.clientSocket.write(
          utils.mergeBytes(
            "gsea\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        break;
      }
      default: {
        utils.log("Unhandled packet! " + this.action, "warn");
      }
    }
  }
}

module.exports = CommandController;
