const crypto = require("crypto");
const Buffer = require("Buffer");
let gamertag;
let lastType;
let inGame;
let uid;
let maddr;
let clientIp;
let token;
let callID;
class CommandController {
  constructor(data, socket, ServerManager) {
    this.action = data.substring(0, 4);
    this.message = data;
    this.clientSocket = socket;
    this.serverManager = ServerManager;
  }

  process(ServerManager) {
    const osKey = crypto
      .createHash("sha256")
      .update(this.serverManager.serverIP)
      .digest("hex")
      .slice(0, 32);

    console.log(this.action);
    switch (this.action) {
      case "@tic": {
        // if the tic and dir packet merge then respond.
        if (this.message.length > 23) {
          let dir = `@dir\0\0\0\0\0\0\0XADDR=${this.serverManager.serverIP}\tPORT=${this.serverManager.serverPort}\tMASK=fffffffffffffffffffffffffffffffff\tSESS=1\0`;
          this.clientSocket.write(dir);
        }
        break;
      }
      case "@dir": {
        let dir = `@dir\0\0\0\0\0\0\0XADDR=${this.serverManager.serverIP}\tPORT=${this.serverManager.serverPort}\tMASK=fffffffffffffffffffffffffffffffff\tSESS=1\0`;
        this.clientSocket.write(dir);
        break;
      }
      case "addr": {
        clientIp = this.message.split("ADDR=")[1].split("\x0a")[0];
        var message = `~png\0\0\0\0\0\0\0#REF=${getTime()}\0`;
        this.clientSocket.write(message);
        callID = 1029;
        break;
      }
      case "skey": {
        this.clientSocket.write(
          `skey\0\0\0\0\0\0\0OSKEY=$${osKey}\tDP=XBL2/Burnout-Jan2008/mod\0news\0\0\0\0\0\0\x0E\x0EROAD_RULES_RESET_DATE="2007.10.11 18:00:00"\tUSE_GLOBAL_ROAD_RULE_SCORES=0\tCAR_OLD_ROAD_RULES_TAGFIELD=RULES,RULES1,RULES2,RULES3,RULES4,RULES5,RULES6,RULES7,RULES8,RULES9,RULES10,RULES11,RULES12,RULES13,RULES14,RULES15,RULES16\tCAR_ROAD_RULES_TAGFIELD=RULES17\tBIKE_DAY_OLD_ROAD_RULES_TAGFIELD=BIKEDAYRULES1,BIKEDAYRULES2\tBIKE_DAY_ROAD_RULES_TAGFIELD=BIKEDAYRULES3\tBIKE_NIGHT_OLD_ROAD_RULES_TAGFIELD=BIKENIGHTRULES1,BIKENIGHTRULES2\tBIKE_NIGHT_ROAD_RULES_TAGFIELD=BIKENIGHTRULES3\tBUDDY_SERVER=127.0.0.1\tBUDDY_PORT=13505\tPEERTIMEOUT=10000\tTOS_URL=http://gos.ea.com/easo/editorial/common/2008/tos/tos.jsp?lang=%25s&platform=xbl2&from=%25s\tTOSA_URL=http://gos.ea.com/easo/editorial/common/2008/tos/tos.jsp?style=view&lang=%25s&platform=xbl2&from=%25s\tTOSAC_URL=http://gos.ea.com/easo/editorial/common/2008/tos/tos.jsp?style=accept&lang=%25s&platform=xbl2&from=%25s\tEACONNECT_WEBOFFER_URL=http://gos.ea.com/easo/editorial/common/2008/eaconnect/connect.jsp?site=easo&lkey=$LKEY$&lang=%25s&country=%25s\tGPS_REGIONS=127.0.0.1,127.0.0.1,127.0.0.1,127.0.0.1\tQOS_LOBBY=127.0.0.1\tQOS_PORT=17582\tPROFANE_STRING=@/&!\tFEVER_CARRIERS=FritzBraun,EricWimp,Matazone,NutKC,FlufflesDaBunny,Flinnster,Molen,LingBot,DDangerous,Technocrat,The%20PLB,Chipper1977,Bazmobile,CustardKid,The%20Wibbler,AlexBowser,Blanks%2082,Maxreboh,Jackhamma,MajorMajorMajor,Riskjockey,ChiefAV,Charnjit,Zietto,BurntOutDave,Belj,Cupster,Krisis1969,OrangeGopher,Phaigoman,Drastic%20Surgeon,Tom%20Underdown,Discodoktor,Cargando,Gaztech,PompeyPaul,TheSoldierBoy,louben17,Colonel%20Gambas,EliteBeatAgent,Uaintdown,SynergisticFX,InfamousGRouse,EAPR,EAPR%2002,Jga360%20JP2,EAJproduct\tNEWS_DATE="2008.6.11 21:00:00"\tNEWS_URL=http://gos.ea.com/easo/editorial/common/2008/news/news.jsp?lang=%25s&from=%25s&game=Burnout&platform=xbl2\tUSE_ETOKEN=1\tLIVE_NEWS2_URL=http://portal.burnoutweb.ea.com/loading.php?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s\tLIVE_NEWS_URL=https://gos.ea.com/easo/editorial/Burnout/2008/livedata/main.jsp?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s\tSTORE_URL_ENCRYPTED=1\tSTORE_URL=https://pctrial.burnoutweb.ea.com/t2b/page/index.php?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s\tAVATAR_URL_ENCRYPTED=1\tAVATAR_URL=https://31.186.250.154:8443/avatar?persona=%25s\tBUNDLE_PATH=https://gos.ea.com/easo/editorial/Burnout/2008/livedata/bundle/\tETOKEN_URL=https://31.186.250.154:8443/easo/editorial/common/2008/nucleus/nkeyToNucleusEncryptedToken.jsp?nkey=%25s&signature=%25s\tPRODUCT_DETAILS_URL=https://pctrial.burnoutweb.ea.com/t2b/page/ofb_pricepoints.php?productId=%25s&env=live\tPRODUCT_SEARCH_URL=https://pctrial.burnoutweb.ea.com/t2b/page/ofb_DLCSearch.php?env=live\tSTORE_DLC_URL=https://pctrial.burnoutweb.ea.com/t2b/page/index.php?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s&prodid=%25s\tAVAIL_DLC_URL=https://gos.ea.com/easo/editorial/Burnout/2008/livedata/Ents.txt\tROAD_RULES_SKEY=frscores\tCHAL_SKEY=chalscores\tTELE_DISABLE=AD,AF,AG,AI,AL,AM,AN,AO,AQ,AR,AS,AW,AX,AZ,BA,BB,BD,BF,BH,BI,BJ,BM,BN,BO,BR,BS,BT,BV,BW,BY,BZ,CC,CD,CF,CG,CI,CK,CL,CM,CN,CO,CR,CU,CV,CX,DJ,DM,DO,DZ,EC,EG,EH,ER,ET,FJ,FK,FM,FO,GA,GD,GE,GF,GG,GH,GI,GL,GM,GN,GP,GQ,GS,GT,GU,GW,GY,HM,HN,HT,ID,IL,IM,IN,IO,IQ,IR,IS,JE,JM,JO,KE,KG,KH,KI,KM,KN,KP,KR,KW,KY,KZ,LA,LB,LC,LI,LK,LR,LS,LY,MA,MC,MD,ME,MG,MH,ML,MM,MN,MO,MP,MQ,MR,MS,MU,MV,MW,MY,MZ,NA,NC,NE,NF,NG,NI,NP,NR,NU,OM,PA,PE,PF,PG,PH,PK,PM,PN,PS,PW,PY,QA,RE,RS,RW,SA,SB,SC,SD,SG,SH,SJ,SL,SM,SN,SO,SR,ST,SV,SY,SZ,TC,TD,TF,TG,TH,TJ,TK,TL,TM,TN,TO,TT,TV,TZ,UA,UG,UM,UY,UZ,VA,VC,VE,VG,VN,VU,WF,WS,YE,YT,ZM,ZW,ZZ\0`
        );
        break;
      }
      case "~png": {
        break;
      }
      case "sele": {
        if (lastType == undefined) lastType = "0";
        if (inGame == undefined) inGame = 0;

        if (!this.message.includes("MESGTYPES=")) {
          inGame =
            inGame +
            parseInt(this.message.split("INGAME=")[1].split("\x0a")[0]);
          // Game returns msgType P from either here or 100.
          // Which is confusing.
          this.clientSocket.write(
            mergeBytes(
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
              mergeBytes(
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
              mergeBytes(
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
              mergeBytes(
                `sele\0\0\0\0\0\0\0`,
                Buffer.from([0x92], "utf16le"),
                `GAMES=${games}\tMYGAME=${myGames}\tUSERS=${users}\tROOMS=${rooms}\tUSERSETS=${usersets}\tMESGS=${mesgs}\tMESGTYPES=${lastType}\tASYNC=0\tCTRL=0\tSTATS=${stats}\tSLOTS=280\tINGAME=${inGame}\tDP=XBL2/Burnout-Jan2008/mod\0`
              )
            );
            lastType = "P";
          } else {
            if (ServerManager.debug) console.log(`Unhandled sele ${msgType}`);
          }
        }

        break;
      }
      case "auth": {
        // Needs its own player object
        gamertag = this.message.split("GTAG=")[1].split("\x0a")[0];
        this.xuid = this.message
          .split("XUID=")[1]
          .split("\x0a")[0]
          .replace("$", "")
          .toUpperCase();
        uid = crypto
          .createHash("sha256")
          .update(this.xuid)
          .digest("hex")
          .slice(0, 16);
        token = crypto
          .createHash("sha256")
          .update(this.xuid + uid)
          .digest("hex")
          .slice(0, 41);
        console.log(
          `${gamertag}(XUID -> ${this.xuid} IP -> ${clientIp}) joined the server.`
        );

        this.clientSocket.write(
          mergeBytes(
            `auth\0\0\0\0\0\0`,
            Buffer.from([0x01, 0x90], "utf16le"),
              `LAST=2018.1.1-00:00:00\tTOS=1\tSHARE=1\t_LUID=$${uid}\tNAME=${gamertag}\tPERSONAS=${gamertag}\tMAIL=mail@example.com\tBORN=19700101\tFROM=GB\tLOC=enGB\tSPAM=YN\tSINCE=2008.1.1-00:00:00\tGFIDS=1\tADDR=${clientIp}\tTOKEN=${token}0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000.\0`
          )
        );

        break;
      }
      case "pers": {
        maddr = mergeBytes(
          this.message.split("MADDR=")[1].split("^")[0] + "^",
          Buffer.from([
            0xc4, 0xdc, 0xd0, 0xa7, 0xc9, 0xc8, 0x8b, 0xfa, 0x94, 0x99, 0x82,
            0x85, 0xa0, 0x84, 0xd2, 0x8e, 0x86, 0xc5, 0x80, 0x90, 0x82, 0xa9,
            0x87, 0xc3, 0xa2, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80,
            0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80, 0x80
          ])
        );
        // KNAME and GNAME
        this.clientSocket.write(
          mergeBytes(
            `pers\0\0\0\0\0\0`,
            Buffer.from([0x01], "utf16le"),
            `GNAME=${gamertag}\tPERS=${gamertag}\tLAST=2018.1.1-00:00:00\tPLAST=2018.1.1-00:00:00\tSINCE=2008.1.1-00:00:00\tPSINCE=2008.1.1-00:00:00\tLKEY=000000000000000000000000000.\tSTAT=,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\tLOC=enGB\tA=${clientIp}\tMA=`,
            maddr,
            `\tLA=${clientIp}\tIDLE=50000\0`
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
            mergeBytes(
              "newsnew8\0\0",
              Buffer.from([0x02, 0x91], "utf16le"),
              "MIN_TIME_SPENT_SYNCYING_TIME=1\tMAX_TIME_SPENT_SYNCYING_TIME=30\tMAX_TIME_TO_WAIT_FOR_START_TIME=30\tMAX_TIME_TO_WAIT_FOR_SILENT_CLIENT_READY=30\tMAX_TIME_TO_WAIT_FOR_COMMUNICATING_CLIENT_READY=45\tTIME_GAP_TO_LEAVE_BEFORE_START_TIME=5\tIDLE_TIMEOUT=30000\tSEARCH_QUERY_TIME_INTERVAL=30000\tNAT_TEST_PACKET_TIMEOUT=30000\tTOS_BUFFER_SIZE=250000\tNEWS_BUFFER_SIZE=85000\tLOG_OFF_ON_EXIT_ONLINE_MENU=FALSE\tTELEMETRY_FILTERS_FIRST_USE=\tTELEMETRY_FILTERS_NORMAL_USE=\tTIME_BETWEEN_STATS_CHECKS=30\tTIME_BETWEEN_ROAD_RULES_UPLOADS=1\tTIME_BETWEEN_ROAD_RULES_DOWNLOADS=900\tTIME_BEFORE_RETRY_AFTER_FAILED_BUDDY_UPLOAD=600\tTIME_BETWEEN_OFFLINE_PROGRESSION_UPLOAD=600\0"
            )
          );

          this.clientSocket.write(
            mergeBytes(
              `+who\0\0\0\0\0\0\0`,
              Buffer.from([0xec], "utf16le"),
              `I=${callID}\tN=${gamertag}\tM=${gamertag}\tF=U\tA=${clientIp}\tP=1\tS=,,\tG=0\tAT=\tCL=511\tLV=1049601\tMD=0\tLA=${clientIp}\tHW=0\tRP=0\tMA=`,
              maddr,
              "\tLO=enGB\tX=\tUS=0\tPRES=1\tVER=7\tC=,,,,,,,,\0"
            )
          );
        }
        break;
      }
      case "usld": {
        this.clientSocket.write(
          mergeBytes(
            `usld\0\0\0\0\0\0\0`,
            Buffer.from([0xc5], "utf16le"),
            `SPM_EA=1\tSPM_PART=0\tIMGATE=0\tUID=$${uid}\tQMSG0="Wanna play?"\tQMSG1="I rule!"\tQMSG2=Doh!\tQMSG3="Mmmm... doughnuts."\tQMSG4="What time is it?"\tQMSG5="The truth is out of style."\0`
          )
        );
        break;
      }
      // This could be related to the menus glitch
      case "slst": {
        this.clientSocket.write(
          mergeBytes(
            `slst\0\0\0\0\0\0`,
            Buffer.from([0x04], "utf16le"),
            `)VIEW13=Rival2,"Rival 2 information",\tVIEW14=Rival3,"Rival 3 information",\tVIEW6=LastEvent1,"Recent Event 1 Details",\tVIEW15=Rival4,"Rival 4 information",\tVIEW7=LastEvent2,"Recent Event 2 Details",\tVIEW5=PlayerStatS,"Player Stats Summary",\tVIEW0=lobby,"Online Lobby Stats View",\tVIEW22=DriverDetai,"Driver details",\tVIEW16=Rival5,"Rival 5 information",\tVIEW8=LastEvent3,"Recent Event 3 Details",\tVIEW2=RoadRules,"Road Rules",\tVIEW17=Rival6,"Rival 6 information",\tVIEW9=LastEvent4,"Recent Event 4 Details",\tVIEW18=Rival7,"Rival 7 information",\tVIEW10=LastEvent5,"Recent Event 5 Details",\tVIEW19=Rival8,"Rival 8 information",\tVIEW23=RiderDetail,"Rider details",\tVIEW20=Rival9,"Rival 9 information",\tVIEW25=Friends,"Friends List",\tVIEW11=OfflineProg,"Offline Progression",\tVIEW4=NightBikeRR,"Night Bike Road Rules",\tVIEW26=PNetworkSta,"Paradise Network Stats",\tVIEW3=DayBikeRRs,"Day Bike Road Rules",\tVIEW1=DLC,"DLC Lobby Stats View",\tVIEW24=IsldDetails,"Island details",\tVIEW21=Rival10,"Rival 10 information",\tVIEW12=Rival1,"Rival 1 information",\tCOUNT=27\0`
          )
        );
        break;
      }
      case "sviw": {
        // DLC related (i think)
        this.clientSocket.write(
          mergeBytes(
            "sviw\0\0\0\0\0\0",
            Buffer.from([0x01, 0x17], "utf16le"),
            "N=13\tNAMES=0,3,4,5,6,7,8,9,10,11,12,13,14\tDESCS=1,1,1,1,1,1,1,1,1,1,1,1,1\tPARAMS=2,2,2,2,2,2,2,2,2,2,2,2,2\tTYPES=~num,~num,~num,~num,~num,~rnk,~num,~num,~num,~num,~num,~num\tSYMS=TOTCOM,a,0,TAKEDNS,RIVALS,ACHIEV,FBCHAL,RANK,WINS,unk7,unk8,unk9,unk10,unk11,unk12\tSS=83\0"
          )
        );
        break;
      }
      case "sdta": {
        this.clientSocket.write(
          mergeBytes(
            "sdta\0\0\0\0\0\0\0",
            Buffer.from([0x37], "utf16le"),
            "SLOT=0\tSTATS=1,2,3,4,5,6,7,8,9,10,11,12,13\0"
          )
        );
        break;
      }
      case "gpsc": {
        this.clientSocket.write(
          mergeBytes(
            "gpsc\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        let userparams = this.message.split("USERPARAMS=")[1].split("\x0a")[0];

        this.clientSocket.write(
          mergeBytes(
            `+who\0\0\0\0\0\0\0`,
            Buffer.from([0xf0], "utf16le"),
            `I=${callID}\tN=${gamertag}\tM=${gamertag}\tF=U\tA=${clientIp}\tP=1\tS=,,\tG=73\tAT=\tCL=511\tLV=1049601\tMD=0\tLA=${clientIp}\tHW=0\tRP=0\tMA=`,
            maddr,

            `\tLO=enGB\tX=\tUS=0\tPRES=1\tVER=7\tC=,,,,,,,,\0+mgm\0\0\0\0\0\0`,
            Buffer.from([0x02, 0xcd], "utf16le"),
              `IDENT=78\tWHEN=${getTime()}\tNAME=${gamertag}\tHOST=@brobot${callID}\tROOM=0\tMAXSIZE=9\tMINSIZE=2\tCOUNT=2\tPRIV=0\tCUSTFLAGS=413345024\tSYSFLAGS=64\tEVID=0\tEVGID=0\tNUMPART=1\tSEED=73\tGPSHOST=${gamertag}\tGPSREGION=0\tGAMEMODE=0\tGAMEPORT=3074\tVOIPPORT=0\tWHENC=${getTime()}\tSESS=None\tPLATPARAMS=None\tPARTSIZE0=9\tPARAMS=,,,1fc00b80,656e4742\tPARTPARAMS0=\tOPPO0=@brobot${callID}\tOPPART0=0\tOPFLAG0=0\tPRES0=0\tOPID0=${callID}\tADDR0=${this.serverManager.serverIP}\tLADDR0=127.0.0.3\tMADDR0=\tOPPARAM0=${userparams}\tOPPO1=${gamertag}\tOPPART1=0\tOPFLAG1=413345024\tPRES1=0\tOPID1=${callID}\tADDR1=${clientIp}\tLADDR1=${clientIp}\tMADDR1=`,
            maddr,
            `\tOPPARAM1=${userparams}\0`
          )
        );
        break;
      }
      case "hchk": {
        this.clientSocket.write(
          mergeBytes(
            "hchk\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        this.clientSocket.write(
          mergeBytes(
            `+who\0\0\0\0\0\0\0`,
            Buffer.from([0xf0], "utf16le"),
            `I=${callID}\tN=${gamertag}\tM=${gamertag}\tF=U\tA=${clientIp}\tP=1\tS=,,\tG=73\tAT=\tCL=511\tLV=1049601\tMD=0\tLA=${clientIp}\tHW=0\tRP=0\tMA=`,
            maddr,
            "\tLO=enGB\tX=\tUS=0\tPRES=1\tVER=7\tC=,,,,,,,,\0"
          )
        );
        break;
      }
      case "gset": {
        // MUST be 791 bytes
        this.clientSocket.write(
          mergeBytes(
            `gset\0\0\0\0\0\0`,
            Buffer.from([0x03, 0x17], "utf16le"),
            `IDENT=73\tWHEN=2024.6.28-8:56:26\tNAME=${gamertag}\tHOST=@brobot${callID}\tROOM=0\tMAXSIZE=9\tMINSIZE=2\tCOUNT=2\tPRIV=0\tCUSTFLAGS=413345024\tSYSFLAGS=64\tEVID=0\tEVGID=0\tNUMPART=1\tSEED=73\tGPSHOST=${gamertag}\tGPSREGION=0\tGAMEMODE=0\tGAMEPORT=3074\tVOIPPORT=0\tWHENC=2024.6.28-8:56:26\tSESS=$`,
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
            `\tPARTSIZE0=9\tPARAMS=,,,1fc00b80,656e4742\tPARTPARAMS0=\tOPPO0=@brobot948\tOPPART0=0\tOPFLAG0=0\tPRES0=0\tOPID0=948\tADDR0=${this.serverManager.serverIP}\tLADDR0=127.0.0.3\tMADDR0=\tOPPARAM0=PUSMC1A3????,,c0-1,,,a,,,3a54e32a\tOPPO1=${gamertag}\tOPPART1=0\tOPFLAG1=413345024\tPRES1=0\tOPID1=947\tADDR1=${clientIp}\tLADDR1=${clientIp}\tMADDR1=`,
            maddr,
            "\tOPPARAM1=PUSMC1A3????,,c00,,,a,,,3a54e32a\0\0"
          )
        );
        this.clientSocket.write(
          mergeBytes(
            `+mgm\0\0\0\0\0\0`,
            Buffer.from([0x03, 0x17], "utf16le"),
            `IDENT=73\tWHEN=2024.6.28-8:56:26\tNAME=${gamertag}\tHOST=@brobot${callID}\tROOM=0\tMAXSIZE=9\tMINSIZE=2\tCOUNT=2\tPRIV=0\tCUSTFLAGS=413345024\tSYSFLAGS=64\tEVID=0\tEVGID=0\tNUMPART=1\tSEED=73\tGPSHOST=${gamertag}\tGPSREGION=0\tGAMEMODE=0\tGAMEPORT=3074\tVOIPPORT=0\tWHENC=2024.6.28-8:56:26\tSESS=$`,
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
            `\tPARTSIZE0=9\tPARAMS=,,,1fc00b80,656e4742\tPARTPARAMS0=\tOPPO0=@brobot948\tOPPART0=0\tOPFLAG0=0\tPRES0=0\tOPID0=948\tADDR0=${this.serverManager.serverIP}\tLADDR0=127.0.0.3\tMADDR0=\tOPPARAM0=PUSMC1A3????,,c0-1,,,a,,,3a54e32a\tOPPO1=${gamertag}\tOPPART1=0\tOPFLAG1=413345024\tPRES1=0\tOPID1=947\tADDR1=${clientIp}\tLADDR1=${clientIp}\tMADDR1=`,
            maddr,
            "\tOPPARAM1=PUSMC1A3????,,c00,,,a,,,3a54e32a\0"
          )
        );
        break;
      }
      case "rent": {
        this.clientSocket.write('rent\0\0\0\0\0\0\0#$CALLUSER=1029\tGFIDS=0\0');
        break;
      }
      case "rrlc": {
        this.clientSocket.write(
          mergeBytes("rrlciper\0\0\0", Buffer.from([0x0d], "utf16le"), "\0")
        );
        break;
      }
      case "rrgt": {
        this.clientSocket.write(
          mergeBytes("rrgtiper\0\0\0", Buffer.from([0x0d], "utf16le"), "\0")
        );
        break;
      }
      case "gdel": {
        this.clientSocket.write(
          mergeBytes(
            "gdel\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        this.clientSocket.write(
          mergeBytes(
            `+who\0\0\0\0\0\0\0`,
            Buffer.from([0xf0], "utf16le"),
            `I=${callID}\tN=${gamertag}\tM=${gamertag}\tF=U\tA=${clientIp}\tP=1\tS=,,\tG=73\tAT=\tCL=511\tLV=1049601\tMD=0\tLA=${clientIp}\tHW=0\tRP=0\tMA=`,
            maddr,

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
          mergeBytes(
            "opup\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        break;
      }
      case "rrup": {
        this.clientSocket.write(
          mergeBytes(
            "rrup\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
        break;
      }
      // Used to insta join game
      case "gqwk": {
        console.log("gqwk packet! " + this.message);
        this.clientSocket.write(
          mergeBytes("gqwknfind\0\0\0", Buffer.from([0x0d], "utf16le"), "\0")
        );
        break;
      }
      case "cate": {
          this.clientSocket.write(
              mergeBytes(
                "cate\0\0\0\0\0\0\0",
                Buffer.from([0x0d], "utf16le"),
                "NSS=18\tSYMS=TEST1,TEST2,TEST3\tCC=1\tIC=1\tVC=1\tR=0,1,1,1,2,0,0\tU=1,2\0"
              )
          );
          break;
      }
      case "snap": {
          this.clientSocket.write(
              mergeBytes(
                "snap\0\0\0\0\0\0\0",
                Buffer.from([0x0d], "utf16le"),
                "\0"
              )
          );
          break;
      }
      case "gsea": {
          this.clientSocket.write(
          mergeBytes(
            "gsea\0\0\0\0\0\0\0",
            Buffer.from([0x0d], "utf16le"),
            "\0"
          )
        );
          break;
      }
      default: {
        console.log("Unhandled packet! " + this.action);
      }
    }
  }
}

function mergeBytes(...arrays) {
  const buffers = arrays.map((array) => Buffer.from(array));
  return Buffer.concat(buffers);
}
function PadString(input, key, requiredByteLength, pad) {
  // Convert input string to UTF-8 encoded bytes
  const encoder = new TextEncoder();
  const byteArray = encoder.encode(input);

  // If input already has the required byte length, return it unchanged
  if (byteArray.length === requiredByteLength) {
    return input;
  }

  // Find the "MASK=" substring and extract current mask
  const maskStartIndex = input.indexOf(key) + key.length; // 5 is the length of "MASK="
  const maskEndIndex = input.indexOf("\t", maskStartIndex);
  const currentMask = input.substring(maskStartIndex, maskEndIndex);

  // Calculate current length and padding bytes needed
  const currentLength = byteArray.length;
  const paddingBytesNeeded = requiredByteLength - currentLength;

  // Add padding if necessary
  let adjustedMask = currentMask;
  if (paddingBytesNeeded > 0) {
    adjustedMask += pad.repeat(paddingBytesNeeded);
  }

  // Construct adjusted string with padded mask
  const adjustedString =
    input.substring(0, maskStartIndex) +
    adjustedMask +
    input.substring(maskEndIndex);
  return adjustedString;
}
function fillString(input, desiredLength, nullChar) {

    // Calculate the number of padding characters needed
    const paddingNeeded = desiredLength - input.length;

    // If the input is already the desired length or longer, return it unchanged
    if (paddingNeeded <= 0) {
        return input;
    }

    // Add the necessary padding characters
    const paddedString = input + nullChar.repeat(paddingNeeded);
    return paddedString;
}
function getTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Months are zero indexed, so January is 0
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Pad single digit values with leading zeros
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // Construct the formatted date-time string
  const formattedDateTime = `${year}.${formattedMonth}.${formattedDay}-${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return formattedDateTime;
}
module.exports = CommandController;
