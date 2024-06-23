const crypto = require('crypto');

class CommandController {
  constructor(action, data, socket) {
    this.action = action;
    this.data = data;
    this.socket = socket;
    this.serverIP = "68.46.244.148";
    this.serverPort = "8000";
    this.osKey = crypto.createHash('sha256').update(this.serverIP).digest('hex').slice(0, 33);
  }
  process() {
    let skey = 0;
    let clientAddr = "";
    let clientPort = 0;
    console.log(this.action);
    switch(this.action) {
        case "@tic": {
            this.socket.write("");
            break;
        }
        case "@dir": {
            this.socket.write("@dir\0\0\0\0\0\0\0XADDR=" + this.serverIP + "    PORT=" + this.serverPort + "    MASK=ffffffffffffffffffffffffffffffff    SESS=1");
            break;
        }
        case "addr": {
            console.log(this.data);
            clientAddr = this.data.split("ADDR=")[1];
            clientPort = this.data.split("PORT=")[1];
            this.socket.write("");
            break;
        }
        case "skey": {
            console.log(this.data);
            this.skey = this.data.split("SKEY(")[1];
            //this.socket.write("");
            this.socket.write('skey\0\0\0\0\0\0\0OSKEY=' + this.osKey + '\tDP=XBL2/Burnout-Jan2008/modnews\tROAD_RULES_RESET_DATE="2007.10.11 18:00:00"\tUSE_GLOBAL_ROAD_RULE_SCORES=0\tCAR_OLD_ROAD_RULES_TAGFIELD=RULES,RULES1,RULES2,RULES3,RULES4,RULES5,RULES6,RULES7,RULES8,RULES9,RULES10,RULES11,RULES12,RULES13,RULES14,RULES15,RULES16\tCAR_ROAD_RULES_TAGFIELD=RULES17\tBIKE_DAY_OLD_ROAD_RULES_TAGFIELD=BIKEDAYRULES1,BIKEDAYRULES2\tBIKE_DAY_ROAD_RULES_TAGFIELD=BIKEDAYRULES3\tBIKE_NIGHT_OLD_ROAD_RULES_TAGFIELD=BIKENIGHTRULES1,BIKENIGHTRULES2\tBIKE_NIGHT_ROAD_RULES_TAGFIELD=BIKENIGHTRULES3\tBUDDY_SERVER=127.0.0.1\tBUDDY_PORT=13505\tPEERTIMEOUT=10000\tTOS_URL=http://gos.ea.com/easo/editorial/common/2008/tos/tos.jsp?lang=%25s&platform=xbl2&from=%25s\tTOSA_URL=http://gos.ea.com/easo/editorial/common/2008/tos/tos.jsp?style=view&lang=%25s&platform=xbl2&from=%25s\tTOSAC_URL=http://gos.ea.com/easo/editorial/common/2008/tos/tos.jsp?style=accept&lang=%25s&platform=xbl2&from=%25s\tEACONNECT_WEBOFFER_URL=http://gos.ea.com/easo/editorial/common/2008/eaconnect/connect.jsp?site=easo&lkey=$LKEY$&lang=%25s&country=%25s\tGPS_REGIONS=127.0.0.1,127.0.0.1,127.0.0.1,127.0.0.1\tQOS_LOBBY=127.0.0.1\tQOS_PORT=17582\tPROFANE_STRING=@/&!\tFEVER_CARRIERS=FritzBraun\tNEWS_DATE="2008.6.11 21:00:00"\tNEWS_URL=http://gos.ea.com/easo/editorial/common/2008/news/news.jsp?lang=%25s&from=%25s&game=Burnout&platform=xbl2\tUSE_ETOKEN=1\tLIVE_NEWS2_URL=http://portal.burnoutweb.ea.com/loading.php?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s\tLIVE_NEWS_URL=https://gos.ea.com/easo/editorial/Burnout/2008/livedata/main.jsp?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s\tSTORE_URL_ENCRYPTED=1\tSTORE_URL=https://pctrial.burnoutweb.ea.com/t2b/page/index.php?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s\tAVATAR_URL_ENCRYPTED=1\tAVATAR_URL=https://' + this.serverIP + ':8443/avatar?persona=%25s\tBUNDLE_PATH=https://gos.ea.com/easo/editorial/Burnout/2008/livedata/bundle/\tETOKEN_URL=https://' + this.serverIP + ':8443/easo/editorial/common/2008/nucleus/nkeyToNucleusEncryptedToken.jsp?nkey=%25s&signature=%25s\tPRODUCT_DETAILS_URL=https://pctrial.burnoutweb.ea.com/t2b/page/ofb_pricepoints.php?productId=%25s&env=live\tPRODUCT_SEARCH_URL=https://pctrial.burnoutweb.ea.com/t2b/page/ofb_DLCSearch.php?env=live\tSTORE_DLC_URL=https://pctrial.burnoutweb.ea.com/t2b/page/index.php?lang=%25s&from=%25s&game=Burnout&platform=xbl2&env=live&nToken=%25s&prodid=%25s\tAVAIL_DLC_URL=https://gos.ea.com/easo/editorial/Burnout/2008/livedata/Ents.txt\tROAD_RULES_SKEY=frscores\tCHAL_SKEY=chalscores\tTELE_DISABLE=AD,AF,AG,AI,AL,AM,AN,AO,AQ,AR,AS,AW,AX,AZ,BA,BB,BD,BF,BH,BI,BJ,BM,BN,BO,BR,BS,BT,BV,BW,BY,BZ,CC,CD,CF,CG,CI,CK,CL,CM,CN,CO,CR,CU,CV,CX,DJ,DM,DO,DZ,EC,EG,EH,ER,ET,FJ,FK,FM,FO,GA,GD,GE,GF,GG,GH,GI,GL,GM,GN,GP,GQ,GS,GT,GU,GW,GY,HM,HN,HT,ID,IL,IM,IN,IO,IQ,IR,IS,JE,JM,JO,KE,KG,KH,KI,KM,KN,KP,KR,KW,KY,KZ,LA,LB,LC,LI,LK,LR,LS,LY,MA,MC,MD,ME,MG,MH,ML,MM,MN,MO,MP,MQ,MR,MS,MU,MV,MW,MY,MZ,NA,NC,NE,NF,NG,NI,NP,NR,NU,OM,PA,PE,PF,PG,PH,PK,PM,PN,PS,PW,PY,QA,RE,RS,RW,SA,SB,SC,SD,SG,SH,SJ,SL,SM,SN,SO,SR,ST,SV,SY,SZ,TC,TD,TF,TG,TH,TJ,TK,TL,TM,TN,TO,TT,TV,TZ,UA,UG,UM,UY,UZ,VA,VC,VE,VG,VN,VU,WF,WS,YE,YT,ZM,ZW,ZZ');
            break;
        }
        case "news": {
            this.socket.write("newsnew8\0\0\0\0\0\0\0MIN_TIME_SPENT_SYNCYING_TIME=1\tMAX_TIME_SPENT_SYNCYING_TIME=30\tMAX_TIME_TO_WAIT_FOR_START_TIME=30\tMAX_TIME_TO_WAIT_FOR_SILENT_CLIENT_READY=30\tMAX_TIME_TO_WAIT_FOR_COMMUNICATING_CLIENT_READY=45\tTIME_GAP_TO_LEAVE_BEFORE_START_TIME=5\tIDLE_TIMEOUT=30000\tSEARCH_QUERY_TIME_INTERVAL=30000\tNAT_TEST_PACKET_TIMEOUT=30000\tTOS_BUFFER_SIZE=250000\tNEWS_BUFFER_SIZE=85000\tLOG_OFF_ON_EXIT_ONLINE_MENU=false\tTELEMETRY_FILTERS_NORMAL_USE=\tTIME_BETWEEN_STATS_CHECKS=30\tTIME_BETWEEN_ROAD_RULES_UPLOADS=1\tTIME_BETWEEN_ROAD_RULES_DOWNLOADS=900\tTIME_BEFORE_RETRY_AFTER_FAILED_BUDDY_UPLOAD=600\tTIME_BETWEEN_OFFLINE_PROGRESSION_UPLOAD=600");
            
            break;
        }
        default: {
            console.log("Unhandled packet! " + this.action);
        }
      }
  }
}

module.exports = CommandController;
