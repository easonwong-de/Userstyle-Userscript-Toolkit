// ==UserScript==
// @name         Chinese Eye Candy
// @namespace    easonwong
// @homepageURL  https://github.com/easonwong-de/Userstyle-Userscript-Toolkit
// @supportURL   https://github.com/easonwong-de/Userstyle-Userscript-Toolkit/issues
// @version      1.0
// @description  Makes Chinese text look right: auto spacing + s2t conversion
// @author       Eason & hoothin
// @require      https://cdn.jsdelivr.net/npm/pangu@7.2.0/dist/browser/pangu.umd.js
// @icon         https://easonwong.de/favicon.png
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.registerMenuCommand
// ==/UserScript==
// hoothin: 因一簡對多繁，所以簡轉繁需要優先排除異體字，並根據詞彙轉換。其他需要語義分析的，暫時無解。整理繁簡對照表很費時，因此不打臉的話不再更新，如有需求，刪減自用。更精細的需求可自行申請相應 API 或自行訓練語義 AI 並搭建對照數據庫。在油猴脚本裏面如此這般折騰，我是覺得沒有意義啦。。。

// prettier-ignore
const simplifiedCharacters =
`万与丑专业丛东丝丢两严丧个丰临为丽举么义乌乐乔习乡书买乱争于亏云亘亚产亩亲亵亸亿仅仆从仑仓仪们价众优伙会伛伞伟传伡伣伤伥伦伧伪伫体佣佥侠侣侥侦侧侨侩侪侬侭俣俦俨俩俪俫俭借债倾偬偻偾偿傤傥傧储傩儿克兑兖党兰关兴兹养
兽冁内冈册冗写军农冢冯冲决况冻净凄准凉减凑凛几凤处凫凭凯凶击凿刍划刘则刚创删别刬刭刹刽刾刿剀剂剐剑剥剧劝办务劢动励劲劳势勋勖勚匀匦匮区医华协单卖卜卢卤卧卫却卷厂厅历厉压厌厍厐厕厘厠厢厣厦厨厩厮县叁参叆叇双发变叙叠
只台叶号叹叽吁后吓吕吗吨听启吴呐呒呓呕呖呗员呙呛呜周咏咙咛咝咤咨咸响哑哒哓哔哕哗哙哜哝哟唇唉唛唝唠唡唢唤啓啧啬啭啮啯啰啴啸喂喷喽喾嗫嗳嘘嘤嘱噜嚣团园囱围囵国图圆圣圹场坏块坚坛坜坝坞坟坠垄垅垆垒垦垩垫垭垯垱垲垴埘埙
埚堑堕塆墙墻壊壮声壳壶壸処备复够头夸夹夺奁奂奋奖奥奬妆妇妈妩妪妫姗姜姹娄娅娆娇娈娱娲娴婳婴婵婶媪媭嫒嫔嫱嬀嬷孙学孪宁宝实宠审宪宫宽宾寝对寻导寿将尔尘尝尧尴尸尽层屃屉届属屡屦屿岁岂岖岗岘岚岛岩岭岳岽岿峃峄峡峣峤峥峦
峰崂崃崄崭嵘嵚嵝巅巨巩巯币布帅师帏帐帘帜带帧帮帱帻帼幂并广庄庆床庐庑库应庙庞废庼廏廪开异弃弑张弥弪弯弹强归当录彝彟彦彨彻征径徕御忆忏志忧念忾怀态怂怃怄怅怆怜总怼怿恋恒恳恶恸恹恺恻恼恽悦悫悬悭悮悯惊惧惨惩惫惬惭惮惯
愠愤愦愿慑慭懑懒懔戆戋戏戗战戬户扎扑托扦执扩扪扫扬扰抚抛抟抠抡抢护报抬抻担拟拢拣拥拦拧拨择挂挚挛挜挝挞挟挠挡挢挣挤挥挦捂捝捞损捡换捣据捻掳掴掷掸掺掼揽揾揿搀搁搂搄搅携摄摅摆摇摈摊撄撑撵撷撸撺擜擞攒敌敍敚敛敩数斋斓
斗斩断无旧时旷旸昙昼昽显晋晒晓晔晕晖暂暧札术朴机杀杂权杠条来杨杩杰松板极构枞枢枣枥枧枨枪枫枭柜柠柽栀栅标栈栉栊栋栌栎栏树栖样栾桠桡桢档桤桥桦桧桨桩桪梁梦梼梾梿检棁棂棱椁椝椟椠椢椤椫椭椮楼榄榅榇榈榉榝槚槛槟槠横樯樱
橥橱橹橼檐檩欢欤欧歼殁殇残殒殓殚殡殴殻毁毂毕毙毡毵氇气氢氩氲汇汉污汤汹沟没沣沤沥沦沧沨沩沪泄泞注泪泶泷泸泺泻泼泽泾洁洒洼浃浅浆浇浈浉浊测浍济浏浐浑浒浓浔浕涂涌涚涛涝涞涟涠涡涢涣涤润涧涨涩淀渊渌渍渎渐渑渔渖渗温游湾
湿溁溃溅溆溇滗滚滞滟滠满滢滤滥滦滨滩滪潆潇潋潍潙潜潨潴澛澜濑濒灏灭灯灵灶灾灿炀炉炖炜炝点炼炽烁烂烃烛烟烦烧烨烩烫烬热焕焖焘煴爱爷牍牦牵牺犊状犷犸犹狈狝狞独狭狮狯狰狱狲猃猎猕猡猪猫猬献獭玑玙玚玛玮环现玱玺珐珑珰珲琎
琏琐琼瑶瑷瑸璎瓒瓮瓯産电画畅畴疖疗疟疠疡疬疭疮疯疱疴痈痉痒痖痨痪痫痴痹瘅瘆瘉瘗瘘瘪瘫瘾瘿癞癣癫皋皑皱皲盏盐监盖盗盘眍眦眬着睁睐睑睾瞆瞒瞩矫矶矾矿砀码砖砗砚砜砺砻砾础硁硅硕硖硗硙硚确硵硷碍碛碜碱礼祃祎祢祯祷祸禀禄禅
离秃秆种秘积称秸秽秾稆税稣稳穑穞穷窃窍窎窑窜窝窥窦窭竖竞竪笃笋笔笕笺笼笾筑筚筛筜筝筹筼签筿简箓箦箧箨箩箪箫篑篓篮篯篱簖籁籴类籼粜粝粤粪粮糁糇糍系紧绝絷綫緑纟纠纡红纣纤纥约级纨纩纪纫纬纭纮纯纰纱纲纳纴纵纶纷纸纹纺纻
纼纽纾线绀绁绂练组绅细织终绉绊绋绌绍绎经绐绑绒结绔绕绖绗绘给绚绛络絶绞统绠绡绢绣绤绥绦继绨绩绪绫绬续绮绯绰绱绲绳维绵绶绷绸绹绺绻综绽绾绿缀缁缂缃缄缅缆缇缈缉缊缋缌缍缎缏缐缑缒缓缔缕编缗缘缙缚缛缜缝缞缟缠缡缢缣缤缥
缦缧缨缩缪缫缬缭缮缯缰缱缲缳缴缵罂网罗罚罢罴羁羟羡群翘翙翚翱耢耧耸耻聂聋职聍联聩聪肃肠肤肮肴肾肿胀胁胆胜胧胨胪胫胶脉脍脏脐脑脓脔脚脱脶脸腊腌腘腭腻腼腽腾膑膻臜致舆舍舣舰舱舻艰艳艺节芈芗芜芦苁苇苈苋苌苍苎苏苧苹范茎
茏茑茔茕茧荆荐荙荚荛荜荝荞荟荠荡荣荤荥荦荧荨荩荪荫荬荭荮药莅莱莲莳莴莶获莸莹莺莼萚萝萤营萦萧萨葱蒀蒇蒉蒋蒌蒏蓝蓟蓠蓣蓥蓦蔂蔷蔹蔺蔼蕰蕲蕴薮藓蘖虏虑虚虫虬虮虱虽虾虿蚀蚁蚂蚃蚕蚝蚬蛊蛎蛏蛮蛰蛱蛲蛳蛴蜕蜗蜡蝇蝈蝉蝎蝼蝾
螀螨蟏衅衆衔补表衬衮袄袅袆袜袭袯装裆裈裢裣裤裥褛褴襕见观觃规觅视觇览觉觊觋觌觍觎觏觐觑觞触觯訚詟誉誊说谣讠计订讣认讥讦讧讨让讪讫讬训议讯记讱讲讳讴讵讶讷许讹论讻讼讽设访诀证诂诃评诅识诇诈诉诊诋诌词诎诏诐译诒诓诔试
诖诗诘诙诚诛诜话诞诟诠诡询诣诤该详诧诨诩诪诫诬语诮误诰诱诲诳说诵诶请诸诹诺读诼诽课诿谀谁谂调谄谅谆谇谈谉谊谋谌谍谎谏谐谑谒谓谔谕谖谗谘谙谚谛谜谝谞谟谠谡谢谣谤谥谦谧谨谩谪谫谬谭谮谯谰谱谲谳谴谵谶谷豮贜贝贞负贠贡财
责贤败账货质贩贪贫贬购贮贯贰贱贲贳贴贵贶贷贸费贺贻贼贽贾贿赀赁赂赃资赅赆赇赈赉赊赋赌赍赎赏赐赑赒赓赔赕赖赗赘赙赚赛赜赝赞赟赠赡赢赣赪赵赶趋趱趸跃跄跖跞跡践跶跷跸跹跻踊踌踪踬踯蹑蹒蹰蹿躏躜躯軆輼车轧轨轩轪轫转轭轮软
轰轱轲轳轴轵轶轷轸轹轺轻轼载轾轿辀辁辂较辄辅辆辇辈辉辊辋辌辍辎辏辐辑辒输辔辕辖辗辘辙辚辞辟辩辫边辽达迁过迈运还这进远违连迟迩迳迹适选逊递逦逻遗遥邓邝邬邮邹邺邻郁郏郐郑郓郦郧郸酂酝酦酱酽酾酿采释里钩鉴銮鋭録錾钅钆钇
针钉钊钋钌钍钎钏钐钑钒钓钔钕钖钗钘钙钚钛钜钝钞钟钠钡钢钣钤钥钦钧钨钩钪钫钬钭钮钯钰钱钲钳钴钵钶钷钸钹钺钻钼钽钾钿铀铁铂铃铄铅铆铇铈铉铊铋铌铍铎铏铐铑铒铓铔铕铖铗铘铙铚铛铜铝铞铟铠铡铢铣铤铥铦铧铨铩铪铫铬铭铮铯铰铱
铲铳铴铵银铷铸铹铺铻铼铽链铿销锁锂锃锄锅锆锇锈锉锊锋锌锍锎锏锐锑锒锓锔锕锖锗锘错锚锛锜锝锞锟锠锡锢锣锤锥锦锧锨锩锪锫锬锭键锯锰锱锲锳锴锵锶锷锸锹锺锻锼锽锾锿镀镁镂镃镄镅镆镇镈镉镊镋镌镍镎镏镐镑镒镓镔镕镖镗镘镙镚镛
镜镝镞镟镠镡镢镣镤镥镦镧镨镩镪镫镬镭镮镯镰镱镲镳镴镵镶长閲门闩闪闫闬闭问闯闰闱闲闳间闵闶闷闸闹闺闻闼闽闾闿阀阁阂阃阄阅阆阇阈阉阊阋阌阍阎阏阐阑阒阓阔阕阖阗阘阙阚阛队阳阴阵阶际陆陇陈陉陕陦陧陨险随隐隶隽难雇雏雠雳雾
霁霉霡霭靓靔静面靥鞑鞒鞯鞲韦韧韨韩韪韫韬韵頽顔页顶顷顸项顺须顼顽顾顿颀颁颂颃预颅领颇颈颉颊颋颌颍颎颏颐频颒颓颔颕颖颗题颙颚颛颜额颞颟颠颡颢颣颤颥颦颧风飏飐飑飒飓飔飕飖飗飘飙飚飞飨餍饣饤饥饦饧饨饩饪饫饬饭饮饯饰饱饲
饳饴饵饶饷饸饹饺饻饼饽饾饿馀馁馂馃馄馅馆馇馈馉馊馋馌馍馎馏馐馑馒馓馔馕駡马驭驮驯驰驱驲驳驴驵驶驷驸驹驺驻驼驽驾驿骀骁骂骃骄骅骆骇骈骉骊骋验骍骎骏骐骑骒骓骔骕骖骗骘骙骚骛骜骝骞骟骠骡骢骣骤骥骦骧髅髋髌鬓鬶魇魉鱼鱽鱾
鱿鲀鲁鲂鲃鲄鲅鲆鲇鲈鲉鲊鲋鲌鲍鲎鲏鲐鲑鲒鲓鲔鲕鲖鲗鲘鲙鲚鲛鲜鲝鲞鲟鲠鲡鲢鲣鲤鲥鲦鲧鲨鲩鲪鲫鲬鲭鲮鲯鲰鲱鲲鲳鲴鲵鲶鲷鲸鲹鲺鲻鲼鲽鲾鲿鳀鳁鳂鳃鳄鳅鳆鳇鳈鳉鳊鳋鳌鳍鳎鳏鳐鳑鳒鳓鳔鳕鳖鳗鳘鳙鳛鳜鳝鳞鳟鳠鳡鳢鳣鳤鷀鷄鸟鸠鸡
鸢鸣鸤鸥鸦鸧鸨鸩鸪鸫鸬鸭鸮鸯鸰鸱鸲鸳鸴鸵鸶鸷鸸鸹鸺鸻鸼鸽鸾鸿鹀鹁鹂鹃鹄鹅鹆鹇鹈鹉鹊鹋鹌鹍鹎鹏鹐鹑鹒鹓鹔鹕鹖鹗鹘鹙鹚鹛鹜鹝鹞鹟鹠鹡鹢鹣鹤鹥鹦鹧鹨鹩鹪鹫鹬鹭鹮鹯鹰鹱鹲鹳鹴鹾麦麸麹麽黄黉黡黩黪黾鼋鼌鼍鼹齐齑齿龀龁龂龃龄
龅龆龇龈龉龊龋龌龙龚龛龟酸亜悪圧囲壱隠栄営衛駅奨円塩縁艶応桜温穏仮価壊懐拡殻覚楽陥勧関歓観気帰亀戯旧拠挙郷暁区駆恵経蛍軽継鶏芸撃県倹剣険検権顕験厳広恒鉱穀砕済斎剤雑桟賛残糸歯児実釈寿収従渋獣縦粛処渉焼証乗剰畳縄壌
嬢譲醸図粋酔穂瀬斉摂専浅戦践銭繊荘捜挿巣痩総騒蔵臓続対帯滝択沢団弾遅鋳庁聴逓鉄伝稲闘徳読弐悩脳覇拝廃売発髪抜蛮浜払仏辺変歩豊満麺訳薬揺様謡頼覧竜両猟緑涙塁類戻霊齢暦歴錬労録尭巌禄穣唖頴鴎撹鹸噛繍醤掻痩桝麺蝋転渓聡
単`;

// prettier-ignore
const traditionalCharacters =
`萬與醜專業叢東絲丟兩嚴喪個豐臨為麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅僕從侖倉儀們價眾優夥會傴傘偉傳俥俔傷倀倫傖僞佇體傭僉俠侶僥偵側僑儈儕儂儘俁儔儼倆儷倈儉藉債傾傯僂僨償儎儻儐儲儺兒剋兌兗黨蘭關興茲養
獸囅內岡冊宂寫軍農塚馮沖決況凍淨淒準涼減湊凜幾鳳處鳧憑凱兇擊鑿芻劃劉則剛創刪別剗剄剎劊㓨劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳勗勩勻匭匱區醫華協單賣蔔盧鹵臥衛卻捲廠廳歷厲壓厭厙龎廁釐廁廂厴廈廚廄廝縣叄參靉靆雙發變敘疊
隻臺葉號嘆嘰籲後嚇呂嗎噸聽啟吳吶嘸囈嘔嚦唄員咼嗆嗚週詠嚨嚀噝吒諮鹹響啞噠嘵嗶噦嘩噲嚌噥喲脣欸嘜嗊嘮啢嗩喚啟嘖嗇囀齧嘓囉嘽嘯餵噴嘍嚳囁噯噓嚶囑嚕囂團園囪圍圇國圖圓聖壙場壞塊堅壇壢壩塢墳墜壟壠壚壘墾堊墊埡墶壋塏堖塒壎
堝塹墮壪牆牆壞壯聲殼壺壼處備復夠頭誇夾奪奩奐奮獎奧獎妝婦媽嫵嫗媯姍薑奼婁婭嬈嬌孌娛媧嫻嫿嬰嬋嬸媼嬃嬡嬪嬙媯嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵嘗堯尷屍盡層屭屜屆屬屢屨嶼歲豈嶇崗峴嵐島巖嶺嶽崬巋嶨嶧峽嶢嶠崢巒
峯嶗崍嶮嶄嶸嶔嶁巔鉅鞏巰幣佈帥師幃帳簾幟帶幀幫幬幘幗冪併廣莊慶牀廬廡庫應廟龐廢廎廄廩開異棄弒張彌弳彎彈強歸當錄彜彠彥彲徹徵徑徠禦憶懺誌憂唸愾懷態慫憮慪悵愴憐總懟懌戀恆懇惡慟懨愷惻惱惲悅愨懸慳悞憫驚懼慘懲憊愜慚憚慣
慍憤憒願懾憖懣懶懍戇戔戲戧戰戩戶紮撲託扡執擴捫掃揚擾撫拋摶摳掄搶護報擡捵擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏摀挩撈損撿換搗據撚擄摑擲撣摻摜攬搵撳攙擱摟揯攪攜攝攄擺搖擯攤攖撐攆擷擼攛㩵擻攢敵敘敓斂斆數齋斕
鬥斬斷無舊時曠暘曇晝曨顯晉曬曉曄暈暉暫曖劄術樸機殺雜權槓條來楊榪傑鬆闆極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒椏橈楨檔榿橋樺檜槳樁樳樑夢檮棶槤檢梲櫺稜槨槼櫝槧槶欏樿橢槮樓欖榲櫬櫚櫸樧檟檻檳櫧橫檣櫻
櫫櫥櫓櫞簷檁歡歟歐殲歿殤殘殞殮殫殯毆殼毀轂畢斃氈毿氌氣氫氬氳匯漢汙湯洶溝沒灃漚瀝淪滄渢溈滬洩濘註淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧涗濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁瀋滲溫遊灣
濕濚潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦瀠瀟瀲濰溈潛潀瀦瀂瀾瀨瀕灝滅燈靈竈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾熅愛爺牘犛牽犧犢狀獷獁猶狽獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽琺瓏璫琿璡
璉瑣瓊瑤璦璸瓔瓚甕甌產電畫暢疇癤療瘧癘瘍癧瘲瘡瘋皰痾癰痙癢瘂癆瘓癇癡痺癉瘮癒瘞瘻癟癱癮癭癩癬癲臯皚皺皸盞鹽監蓋盜盤瞘眥矓著睜睞瞼睪瞶瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜矽碩硤磽磑礄確磠鹼礙磧磣堿禮禡禕禰禎禱禍稟祿禪
離禿稈種祕積稱稭穢穠穭稅穌穩穡穭窮竊竅窵窯竄窩窺竇窶豎競豎篤筍筆筧箋籠籩築篳篩簹箏籌篔簽篠簡籙簀篋籜籮簞簫簣簍籃籛籬籪籟糴類秈糶糲粵糞糧糝餱餈係緊絕縶線綠糹糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵
紖紐紓線紺紲紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏縧繼綈績緒綾緓續綺緋綽鞝緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶線緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹
縵縲纓縮繆繅纈繚繕繒韁繾繰繯繳纘罌網羅罰罷羆羈羥羨群翹翽翬翺耮耬聳恥聶聾職聹聯聵聰肅腸膚骯餚腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏羶臢緻輿捨艤艦艙艫艱豔藝節羋薌蕪蘆蓯葦藶莧萇蒼苧蘇薴蘋範莖
蘢蔦塋煢繭荊薦薘莢蕘蓽萴蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蒕蕆蕢蔣蔞醟藍薊蘺蕷鎣驀虆薔蘞藺藹薀蘄蘊藪蘚櫱虜慮虛蟲虯蟣蝨雖蝦蠆蝕蟻螞蠁蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑
螿蟎蠨釁眾銜補錶襯袞襖裊褘襪襲襏裝襠褌褳襝褲襉褸襤襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶誾讋譽謄說謡訁計訂訃認譏訐訌討讓訕訖託訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試
詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談讅誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞諝謨讜謖謝謠謗謚謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖穀豶贓貝貞負貟貢財
責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗贊贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒蹟踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀體轀車軋軌軒軑軔轉軛輪軟
轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭闢辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郟鄶鄭鄆酈鄖鄲酇醞醱醬釅釃釀採釋裏鉤鑒鑾銳錄鏨釒釓釔
針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鉅鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鈎鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鉋鈰鉉鉈鉍鈮鈹鐸鉶銬銠鉺鋩錏銪鋮鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鎩鉿銚鉻銘錚銫鉸銥
鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨銹銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺鍩錯錨錛錡鍀錁錕錩錫錮鑼錘錐錦鑕鍁錈鍃錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍾鍛鎪鍠鍰鎄鍍鎂鏤鎡鐨鎇鏌鎮鎛鎘鑷钂鐫鎳鎿鎦鎬鎊鎰鎵鑌鎔鏢鏜鏝鏍鏰鏞
鏡鏑鏃鏇鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔钀鑞鑱鑲長閱門閂閃閆閈閉問闖閏闈閑閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隯隉隕險隨隱隸雋難僱雛讎靂霧
霽黴霢靄靚靝靜麵靨韃鞽韉韝韋韌韍韓韙韞韜韻頹顏頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飈飛饗饜飠飣饑飥餳飩餼飪飫飭飯飲餞飾飽飼
飿飴餌饒餉餄餎餃餏餅餑餖餓餘餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢罵馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢鬹魘魎魚魛魢
魷魨魯魴䰾魺鮁鮃鯰鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鰺鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鼇鰭鰨鰥鰩鰟鰜鰳鰾鱈鼈鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣䲘鶿雞鳥鳩雞
鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鷽鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鵾鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶖鶿鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺䴉鸇鷹鸌鸏鸛鸘鹺麥麩麴麼黃黌黶黷黲黽黿鼂鼉鼴齊齏齒齔齕齗齟齡
齙齠齜齦齬齪齲齷龍龔龕龜痠亞惡壓圍壹隱榮營衞驛奬圓鹽緣艷應櫻溫穩假價壞懷擴殼覺樂陷勸關歡觀氣歸龜戲舊據擧鄕曉區驅惠經螢輕繼鷄藝擊縣儉劍險檢權顯驗嚴廣恆鑛穀碎濟齋劑雜棧贊殘絲齒兒實釋壽收從澁獸縱肅處涉燒證乘剩疊繩壤
孃讓釀圖粹醉穗瀨齊攝專淺戰踐錢纖莊搜插巢瘦總騷藏臟續對帶瀧擇澤團彈遲鑄廳聽遞鐵傳稻鬭德讀貳惱腦霸拜廢賣發髮拔蠻濱拂佛邊變步豐滿麵譯藥搖樣謠賴覽龍兩獵綠淚壘類戾靈齡曆歷鍊勞錄堯巖祿穰啞穎鷗攪鹼嚙繡醬搔瘦枡麵蠟轉溪聰
單`;

// prettier-ignore
const contextualConversion = {
扎: ["扎", ["紮", "驻扎", "包扎", "安营扎寨", "屯扎", "稳扎稳打", "纸扎", "扎染", "扎营", "结扎", "捆扎", "编扎"]],
巨: ["巨", ["鉅", "巨款", "巨富", "巨细", "巨子", "艰巨"]],
折: ["折", ["摺", "折叠", "折纸", "存折", "对折", "折痕", "奏折", "折页", "折扇", "折子", "折尺"]],
霉: ["霉", ["黴", "霉菌", "霉素", "发霉", "曲霉", "白霉"]],
捆: ["捆", ["綑", "捆绑", "捆扎"]],
涌: ["涌", ["湧", "汹涌", "涌起", "涌动", "风起云涌", "泉涌", "翻涌", "涌入", "涌泉", "涌出", "蜂涌", "涌现", "潮涌"]],
升: ["升", ["昇", "升华", "提升", "高升", "升平", "升降", "直升", "升仙", "东升", "升天", "飞升"], ["陞", "升官", "升迁", "升任", "步步高升"]],
划: ["划", ["畫", "计划"], ["劃", "企划", "布划", "划策", "㓦划", "刻划", "划一", "划分", "划地", "划定", "划拨", "划时代", "划归", "划清", "划然", "划界", "划线", "区划", "劈划", "规划", "重划", "擘划", "比划", "谋划"]],
姜: ["姜", ["薑", "姜片", "姜葱", "生姜", "姜汁", "姜母鸭", "姜丝", "干姜", "姜黄", "姜糖", "姜汤", "猪脚姜", "野姜", "姜饼", "子姜"]],
御: ["禦", ["御", "御制", "御用", "御驾"]],
毁: ["毀", ["燬", "烧毁", "焚毁", "炸毁", "销毁"], ["譭", "诋毁", "毁谤"]],
胡: ["胡", ["鬍", "胡须", "胡子", "刮胡刀"], ["衚", "胡同"]],
须: ["須", ["鬚", "剃须", "胡须", "须发", "根须"]],
仆: ["仆", ["僕", "主仆", "仆人", "仆仆", "僮仆", "仆固怀恩", "仆射", "仆役", "仆从", "公仆", "女仆", "太仆", "奴仆", "婢仆", "家仆", "童仆", "老仆"]],
同: ["同", ["衕", "衚衕"]],
叹: ["歎", ["嘆", "悲叹", "叹息", "仰天长叹", "叹惋"]],
荡: ["蕩", ["盪", "空荡荡", "回荡", "动荡", "荡漾", "震荡"]],
凄: ["淒", ["悽", "凄厉", "凄惨", "悲凄", "凄苦"]],
栗: ["栗", ["慄", "战栗", "颤栗", "不寒而栗"]],
沈: ["沈", ["瀋", "沈阳", "辽沈"]],
苏: ["蘇", ["甦", "复苏", "苏醒"]],
卤: ["滷", ["鹵", "卤钝", "卤莽", "粗卤", "卤地", "卤素", "卤化"]],
准: ["准", ["準", "准保", "准则", "标准", "对准", "校准", "基准", "瞄准", "水准", "音准", "准备", "准确", "准绳", "准时", "精准"]],
杯: ["杯", ["盃", "奖杯", "世界杯"]],
馈: ["饋", ["餽", "馈赠"]],
向: ["向", ["嚮", "向往", "向导", "向壁虚造", "向使", "向慕"]],
搜: ["搜", ["蒐", "蒐集", "蒐羅"]],
哗: ["嘩", ["譁", "哗变", "喧哗", "哗众取宠"]],
够: ["夠", ["搆", "够不到", "够得到"]],
范: ["范", ["範", "模范", "范本", "示范", "规范", "范围", "仪范", "典范", "风范", "容范", "就范", "师范", "弘范", "懿范", "样范", "母范", "范例", "范势", "范文", "范畴", "闺范", "贻范", "防范", "颜范", "遗范", "鸿范", "轨范"]],
喂: ["喂", ["餵", "喂养", "喂饱", "饲喂", "喂食", "喂猫", "喂猪", "喂羊", "喂牛"]],
迹: ["跡", ["蹟", "古迹", "遗迹", "事迹", "奇迹", "史迹"]],
佩: ["佩", ["珮", "玉佩", "环珮"]],
尸: ["屍", ["尸", "尸位素餐"]],
泛: ["泛", ["氾", "泛滥"]],
雕: ["雕", ["彫", "雕刻", "雕像", "雕塑", "精雕细琢", "雕琢", "冰雕"]],
核: ["核", ["覈", "审核", "核实", "核准", "核对", "复核", "核查"]],
困: ["困", ["睏", "困倦", "困意", "犯困"]],
欲: ["欲", ["慾", "欲望", "情欲", "私欲", "贪欲", "色欲"]],
致: ["致", ["緻", "精致", "细致", "标致"]],
梁: ["梁", ["樑", "栋梁", "桥梁", "横梁", "房梁", "栋梁", "上梁", "下梁", "梁上君子", "偷梁换柱", "架梁", "顶梁柱", "鼻梁", "脊梁", "跳梁", "悬梁"]],
占: ["占", ["佔", "占用", "占领", "侵占", "占为己有", "强占", "占有", "抢占", "占中"]],
卜: ["卜", ["蔔", "萝卜"]],
托: ["托", ["託", "拜托", "托付", "嘱托", "托词", "托辞", "推托", "委托", "托病", "信托", "托梦", "托孤", "托故", "托管", "受托", "寄托"]],
刮: ["刮", ["颳", "刮风", "刮大风", "刮台风", "刮飓风"]],
尽: ["盡", ["儘", "尽快", "尽早", "尽可能", "尽显", "尽量", "尽管"]],
汇: ["匯", ["彙", "词汇", "字汇", "汇集", "汇编", "辞汇"]],
才: ["才", ["纔", "方才", "却才", "恰才"]],
丑: ["醜", ["丑", "小丑", "丑角", "乙丑", "丁丑", "己丑", "辛丑", "癸丑", "副丑"]],
周: ["周", ["週", "周报", "周期", "周会", "周日", "周刊", "周波", "周岁", "周末", "周考", "一周", "二周", "三周", "四周", "五周", "两周", "双周刊", "名剧周", "黄金周", "周休", "周一", "周二", "周三", "周四", "周五", "周六"], ["賙", "周济"]],
冲: ["沖 / 衝", ["沖", "冲刷", "冲冲", "冲天", "冲压", "冲帐", "冲床", "冲厕", "冲洗", "冲泡", "冲凉", "冲淡", "冲泻", "冲积", "冲决", "冲茶", "冲蚀", "冲服", "冲销", "冲龄", "对冲", "谦冲", "冲水"], ["衝", "冲奖", "冲高", "冲决", "冲浪", "冲子", "冲力", "冲要", "冲破", "冲口", "冲顶", "冲床", "冲突", "冲刺", "冲金", "冲模", "冲撞", "冲腾", "冲锋", "冲量", "冲动", "冲程", "冲压", "冲杀", "冲激", "冲击", "俯冲", "反冲", "折冲", "缓冲", "脉冲", "要冲", "冲锋枪", "冲孔机", "冲劲", "冲金点", "冲压机", "冲击波", "反冲力", "冲锋", "横冲", "冲冠", "首当其冲"]],
恶: ["惡", ["噁", "恶心"]],
发: ["發 / 髮", ["發", "开发", "发癫", "发车", "发布", "转发", "发回", "发送", "发展", "发挥", "发现", "发生", "发表", "发怒", "发烧", "发财", "发光", "发觉", "发射", "发明", "发力", "发酵", "发票", "发出", "发育", "发作", "发言", "发亮", "发愁", "发扬", "发病", "发奋", "发热", "发潮", "发愣", "发觉", "发际", "发誓", "发掘", "发力", "发家", "发芽", "发掘", "发售", "发帖", "发达", "发红", "发苦", "发觉", "发问", "发呆", "发泄", "发扬", "发迹", "发票", "发觉", "发烧", "发射", "发痒", "发笑", "发明", "发光", "发送", "爆发", "出发", "发火", "发火", "发电", "启发", "奋发", "激发", "发傻", "发怔", "颁发", "迸发", "发愤", "发怵", "蒸发", "批发", "发昏", "暴发"], ["髮", "发网", "发际", "发箍", "发丝", "发式", "发带", "发型", "发卡", "发妻", "发指", "发廊", "发饰", "发乳", "发夹", "发菜", "发屋", "发姐", "发油", "发套", "发蜡", "发鬓", "发髻", "发雕", "发辫", "发胶", "发浆", "假发", "健发", "削发", "卷发", "握发", "束发", "染发", "植发", "栉发", "毛发", "毫发", "烫发", "理发", "白发", "短发", "秀发", "秃发", "结发", "美发", "胎发", "脱发", "华发", "落发", "蓄发", "护发", "金发", "银发", "头发", "驳发", "鬓发", "须发", "发小", "剃发令", "洗发", "发短心长", "怒发冲冠", "断发文身", "被发", "鹤发", "黄发垂髫", "擢发难数", "庞眉皓发", "披头散发", "间不容发"]],
复: ["復", ["複", "复诊", "复印", "复写", "复查", "复习", "复式", "复种", "复姓", "复核", "复音", "复决", "复利", "复眼", "复句", "复合", "复果", "复述", "复胃", "复本", "复方", "复验", "复选", "复赛", "复议", "复制", "复检", "复杂", "复叶", "复线", "复诵", "复视", "复试", "复数", "复评", "复审", "繁复", "重复", "复元音", "复读机", "复辅音", "复共轭的", "合义复词", "衍声复词", "山重水复"], ["覆", "复電", "批复", "核复", "禀复", "答复", "被复", "赐复", "颠复", "倾复", "函复", "反复", "回复", "复亡", "复函", "复命", "复审", "复复", "复败", "复书", "复核", "复没", "复灭", "复舟"]],
鉴: ["鑒", ["鑑", "鉴于", "鉴识", "鉴赏", "鉴证", "鉴真", "鉴谅", "鉴别", "鉴定", "鉴戒", "人鉴", "借鉴", "印鉴", "可鉴", "品鉴", "唐鉴", "图鉴", "年鉴", "殷鉴", "洞鉴", "王鉴", "评鉴", "赏鉴", "通鉴", "风鉴", "龟鉴", "明通鉴", "鉴往知来", "鉴古推今", "有鉴于此", "渊鉴类函", "引为鉴戒", "之鉴", "宝鉴", "玉鉴", "引以为鉴", "手鉴"]],
历: ["歷", ["曆", "历书", "历象", "历元", "历法", "公历", "回历", "国历", "夏历", "年历", "弘历", "挂历", "日历", "月历", "校历", "桌历", "殷历", "皇历", "旧历", "藏历", "西历", "农历", "阴历", "阳历", "黄历", "台历", "万历帝", "藏历年", "陀历道", "阳历年", "七曜历", "三统历", "乾象历", "天体历", "太初历", "格里历", "统天历", "行事历", "农民历", "农家历", "戊寅元历"]],
链: ["鏈", ["鍊", "链子", "拉链", "精链", "锻链", "项链", "锁链", "铁链"]],
签: ["簽", ["籤", "签子", "签诗", "抽签", "掣签", "书签", "标签", "求签", "牙签", "竹签", "贴标签", "唐音统签", "金瓶掣签", "云笈七签"]],
赞: ["贊", ["讚", "赞赏", "赞佩", "赞美", "赞誉", "赞歌", "赞叹", "赞许", "赞扬", "赞颂", "赞语", "按赞", "盛赞", "礼赞", "称赞", "夸赞", "颂赞", "点赞", "赞不绝口"]],
钟: ["鍾", ["鐘", "钟摆", "钟点", "钟乳", "钟楼", "钟头", "钟鼎", "分钟", "丧钟", "座钟", "挂钟", "摆钟", "时钟", "洪钟", "空钟", "编钟", "诗钟", "警钟", "电钟", "闹钟", "点钟", "钟点房", "钟鼓", "钟点工", "钟鼎文", "大钟寺", "石钟乳", "光学钟", "原子钟", "大本钟", "大笨钟", "宗周钟", "平安钟", "打卡钟", "抖空钟", "撞丧钟", "救命钟", "敲警钟", "敲丧钟", "潜水钟", "生物钟", "石英钟", "自鸣钟", "电子钟", "钟鸣", "晨钟", "黄钟", "撞钟"]],
只: ["只", ["隻", "几只", "一只", "二只", "两只", "三只", "四只", "五只", "六只", "七只", "八只", "九只", "十只", "百只", "千只", "万只", "形单影只", "只言片语", "只字不提"], ["只", "只有", "只会", "只管", "只消", "只当", "只好", "只要", "只能", "只会", "只是", "只怕", "只得", "只见", "只顾", "只许", "只因", "不只", "仅只", "只不过", "只此一家", "只欠东风", "只争朝夕"]],
捂: ["捂", ["摀", "紧捂"]],
咸: ["鹹", ["咸", "咸阳", "咸宜", "咸丰", "咸和", "咸池", "咸五", "彭咸", "季咸", "阮咸", "阿咸", "巫咸", "碧咸", "诺定咸"]],
脏: ["髒", ["臟", "脏器", "脏腑", "五脏", "内脏", "心脏", "肝脏", "肺脏", "胃脏", "胰脏", "脺脏", "脾脏", "肾脏", "腑脏", "肠脏"]],
岳: ["岳", ["嶽", "五岳", "中岳", "北岳", "南岳", "西岳", "东岳", "岳立"]],
云: ["云", ["雲", "云朵", "云雾", "云鬓", "云梯", "云端", "云层", "云海", "云散", "云集", "云霞", "云南", "白云", "乌云", "白云", "风云", "祥云", "星云", "陰云", "云天", "彩云", "浮云", "凌云", "烟云", "积云", "愁云", "风云变幻", "风起云涌", "烟消云散", "叱吒风云"]],
游: ["遊", ["游", "游泳", "游水", "花游"]],
弥: ["彌", ["瀰", "弥漫"]],
松: ["松", ["鬆", "松糕", "松饼", "松气", "鱼松", "肉松", "松心", "松软", "松紧", "松劲", "松动", "松开", "松落", "松绑", "松缓", "松嘴", "松土", "松泛", "松口", "松爽", "松散", "松弛", "松懈", "松快", "松手", "松厚", "松了", "松腻", "轻松", "放松", "松闲", "松松垮垮", "内紧外松"]],
愈: ["愈", ["癒", "不愈", "初愈", "已愈", "康愈", "愈合", "未愈", "治愈", "病愈", "痊愈", "自愈", "伤愈", "愈疮", "渐愈"]],
尝: ["嘗", ["嚐", "品尝", "浅尝辄止", "卧薪尝胆"]],
斗: ["斗", ["鬥", "不斗", "久斗", "互斗", "仍斗", "共斗", "再斗", "初斗", "力斗", "勇斗", "博斗", "又斗", "合斗", "吵斗", "善斗", "大斗", "好斗", "想斗", "打斗", "批斗", "抓斗", "抗斗", "拆斗", "拼斗", "挑斗", "接斗", "搏斗", "敢斗", "文斗", "斗一", "斗上", "斗不", "斗久", "斗了", "斗他", "斗你", "斗倒", "斗出", "斗到", "斗力", "斗勇", "斗去", "斗口", "斗命", "斗嘴", "斗在", "斗垮", "斗士", "斗奇", "斗她", "斗妍", "斗完", "斗弄", "斗得", "斗心", "斗忍", "斗志", "斗快", "斗意", "斗成", "斗我", "斗批", "斗技", "斗招", "斗拳", "斗掌", "斗斗", "斗智", "斗棋", "斗法", "斗牛", "斗狗", "斗狠", "斗眼", "斗神", "斗私", "斗草", "斗角", "斗起", "斗趣", "斗酒", "斗魂", "智斗", "暗斗", "未斗", "格斗", "械斗", "武斗", "死斗", "比斗", "游斗", "激斗", "狠斗", "猛斗", "相斗", "私斗", "群斗", "苦斗", "虎斗", "血斗", "要斗", "角斗", "越斗", "跟斗", "迎斗", "邀斗", "酣斗", "乱斗", "内斗", "别斗", "剧斗", "劲斗", "夺斗", "奋斗", "厮斗", "恶斗", "战斗", "斗来", "斗个", "斗传", "斗剑", "斗劲", "斗胜", "斗场", "斗将", "斗恶", "斗战", "斗擞", "斗败", "斗敌", "斗杀", "斗殴", "斗气", "斗争", "斗兽", "斗毕", "斗舰", "斗艺", "斗艳", "斗赢", "斗输", "斗过", "斗鸡", "斗饮", "斗闹", "斗鱼", "斗丽", "会斗", "权斗", "殴斗", "决斗", "争斗", "独斗", "竞斗", "约斗", "缠斗", "罢斗", "观斗", "赌斗", "较斗", "连斗", "门斗", "双斗", "颤斗", "凤斗"]],
系: ["系", ["係", "关系", "系数", "干系"], ["系", "系统", "系列", "体系", "派系", "直系"], ["繫", "不系", "劾系", "心系", "所系", "拘系", "擐系", "系上", "系乎", "系了", "系住", "系囚", "系妥", "系心", "系念", "系手", "系牢", "系留", "系腰", "系膜", "系起", "颈系", "连系", "联系", "维系", "系马", "系个", "系块", "系带", "系怀", "系挂", "系于", "系条", "系绊", "系紧", "系缚", "系绳", "系缆", "系脚", "系辞", "系铃", "系颈", "牵系", "梦系", "身系", "腰系", "背系", "縻系"]],
舍: ["舍", ["捨", "不舍", "舍得", "难舍", "割舍", "取舍", "四舍五入", "舍不得", "舍命", "舍安就危", "舍己", "舍本逐末", "舍下", "舍生", "舍身", "舍近求远", "施舍", "舍弃", "舍我其谁", "拚舍", "广舍"]],
干: ["干", ["乾", "口干", "吃干", "吐干", "吮干", "吸干", "吹干", "呷干", "喉干", "喝干", "嘴干", "太干", "干井", "干似", "干冰", "干冷", "干化", "干咳", "干咽", "干品", "干哥", "干嚎", "干土", "干坤", "干妹", "干姊", "干姐", "干姜", "干娘", "干爹", "干爸", "干妈", "干季", "干巴", "干布", "干干", "干式", "干弟", "干性", "干料", "干旱", "干杯", "干果", "干枝", "干枯", "干柴", "干梅", "干沙", "干泥", "干洗", "干涸", "干渴", "干焦", "干熬", "干燥", "干爽", "干球", "干疤", "干瘦", "干眼", "干瞪", "干硬", "干窘", "干笑", "干等", "干粉", "干耗", "干肉", "干股", "干脆", "干花", "干草", "干菜", "干薪", "干衣", "干裂", "干透", "干酪", "干醋", "干隆", "干面", "弄干", "很干", "抹干", "抽干", "揩干", "擦干", "晾干", "朝干", "未干", "杯干", "果干", "桑干", "榨干", "水干", "流干", "海干", "滴干", "炒干", "烘干", "烤干", "焙干", "焦干", "煨干", "熨干", "略干", "碗干", "粉干", "耗干", "肉干", "舔干", "菜干", "蒸干", "速干", "干儿", "干哑", "干呕", "干坛", "干孙", "干尸", "干搁", "干晒", "干净", "干涩", "干涧", "干湿", "干热", "干烧", "干瘪", "干瘾", "干发", "干粮", "干结", "干丝", "干声", "干叶", "干号", "干货", "干阳", "干饭", "拧干", "晒干", "极干", "泪干", "沥干", "烧干", "烩干", "发干", "笋干", "绞干", "阴干", "难干", "风干", "饮干", "饼干", "鱼干", "唇干"], ["幹", "干嘛", "干什么", "苦干", "主干", "干部", "公干", "能干", "单干", "实干", "对着干", "干不了", "干得了", "不干了", "干事", "神经干", "干细胞", "干练", "干线", "干劲", "干仗", "干员", "蛮干", "干道", "躯干", "干活", "才干", "贵干", "词干", "脑干", "干略", "精干", "材干", "盲干"]],
了: ["了", ["瞭", "了望", "了然", "了若指掌", "了如指掌", "一目了然"]],
谷: ["谷", ["穀", "不谷", "五谷", "包谷", "嘉谷", "布谷", "年谷", "戬谷", "打谷", "晒谷", "百谷", "谷仓", "谷子", "谷旦", "谷梁", "谷物", "谷神", "稻谷", "谷米", "谷草", "谷贱伤农", "谷雨", "谷类", "谷食", "积谷", "米谷", "臧谷", "辟谷", "钱谷"]],
仿: ["仿", ["倣", "仿效"], ["彷", "仿佛", "仿徉"], ["徬", "仿徨"]],
效: ["效", ["傚", "模效", "摹效", "仿效", "儆效", "效尤", "效法"]],
克: ["克", ["剋", "克夫", "克扣", "克日", "克星", "克期", "克死", "克薄", "生克", "相克", "冲克"], ["刻", "克苦"]],
吊: ["吊", ["弔", "吊信", "吊古", "吊唁", "吊奠", "吊孝", "吊客", "吊影", "吊念", "吊慰", "吊文", "吊民", "吊祭", "哀吊", "唁吊", "盆吊", "祭吊", "陪吊", "吊问", "吊丧", "吊场", "吊书", "吊词", "吊诡", "吊贺", "吊钱", "凭吊"]],
台: ["台", ["颱", "冬台", "秋台", "防台", "台风", "强台", "轻台"], ["檯", "台凳", "台子", "台布", "台面", "吧台", "抹台", "揩台", "球台", "窗台", "翻台", "餐台", "台历", "台灯", "台钟", "书台", "柜台", "赌台", "长台"]],
回: ["回", ["迴", "北回", "南回", "回圈", "回廊", "回旋", "回游", "回翔", "回避", "峰回", "巡回", "迂回", "回环", "回纹", "回绕", "回肠", "回荡", "回銮", "回响", "回风", "梦回", "盘回", "纡回", "萦回", "轮回", "递回"]],
后: ["后", ["後", "前后", "后面", "后怕", "后来", "随后", "后果", "后跟", "幕后", "落后", "身后", "然后", "后方", "后门", "往后", "以后", "税后", "先后", "尔后", "而后", "后代", "背后", "后背", "之后", "后悔", "后裔", "后窍", "后盾", "后影", "善后", "后唐", "后事", "后台", "后劲", "后影", "后晌", "后年", "村后", "向后", "启后", "死后", "后辈", "后日", "后天", "先来后到", "后座", "后排", "后尘", "后庭", "后院", "无后", "靠后", "一前一后", "先人后己", "思前想后", "后继", "后脑", "争先恐后"]],
征: ["征", ["徵", "代征", "停征", "像征", "免征", "咎征", "征了", "征人", "征信", "征候", "征兆", "征入", "征兵", "征募", "征去", "征友", "征取", "征召", "征地", "征婚", "征引", "征得", "征收", "征文", "征求", "征片", "征用", "征稿", "征管", "征聘", "征象", "征逐", "征集", "急征", "性征", "新征", "特征", "狂征", "病征", "稽征", "考征", "苛征", "表征", "象征", "超征", "魏征", "带征", "广征", "强征", "征个", "征启", "征敛", "征状", "征税", "征粮", "征纳", "征缴", "征诏", "征询", "征调", "征财", "征费", "征赋", "征购", "征选", "应征", "横征", "减征", "滥征", "纳征", "缓征", "联征", "详征", "诚征", "课征", "变征", "开征", "体征"]],
注: ["注", ["註", "注解", "备注", "注脚", "批注", "注册", "注定", "校注", "尾注", "注销", "标注", "注释"]],
丰: ["豐", ["丰", "三丰", "丰姿", "丰度", "丰情", "丰神", "丰韵"]],
并: ["並", ["併", "一并", "不并", "并入", "并力", "并合", "并吞", "并图", "并拢", "并案", "并叠", "并砌", "并科", "并负", "并购", "并赃", "并除", "并陇", "侵并", "兼并", "合并", "吞并", "整并", "归并", "相并", "砌并", "被并", "裁并", "购并", "双并"]],
念: ["念", ["唸", "光念", "念佛", "念作", "念到", "念咒", "念好", "念完", "念得", "念念", "念成", "念法", "敢念", "念书", "念给", "念经", "念诵", "念过", "念错", "念点", "没念"]],
借: ["借", ["藉", "借以", "借口", "借故", "慰借", "狼借", "借机", "借词", "凭借", "蕴借"]],
志: ["志", ["誌", "日志", "网志", "墓志铭", "聊斋志异", "三国志", "杂志"]],
么: ["麼", ["么", "老么", "么女", "么儿", "么妹", "么子", "么弟"]],
布: ["布", ["佈", "公布", "分布", "宣布", "密布", "布伏", "布署", "布兵", "布告", "布局", "布施", "布景", "布置", "布防", "布雷", "故布", "散布", "遍布", "传布", "布个", "布坛", "布导", "布岗", "布于", "布满", "布阵", "广布", "摆布", "满布", "发布", "预布"]],
分: ["分", ["份", "分量", "身分"]],
里: ["里", ["裏", "里面", "里头", "这里", "那里", "哪里", "里边", "窝里", "家里", "山里", "里屋", "邻里", "里弄", "夜里", "手里", "里通", "表里", "里应外合", "绵里藏针"]],
面: ["面", ["麪", "制面", "吃面", "拉面", "拌面", "揉面", "杯面", "油面", "泡面", "炒面", "煮面", "碗面", "羹面", "肉面", "辣面", "面店", "面杖", "面灰", "面碗", "面筋", "面粉", "面糊", "面茶", "面食", "食面", "寿面", "杆面", "凉面", "汤面", "烫面", "发面", "酱面", "面价", "面团", "面厂", "面摊", "面汤", "面线", "面饺", "面饼", "面馆", "面馍", "面龟", "饨面", "卤面", "麦面", "干面", "擀面"]],
烟: ["煙", ["菸", "烟斗", "吸烟", "好烟", "戒烟", "抽烟", "支烟", "旱烟", "根烟", "烟商", "烟客", "烟枪", "烟民", "烟灰", "烟瘾", "烟草", "烟酒", "烟头", "烟鬼", "烟龄", "禁烟", "买烟", "香烟"]],
蒙: ["蒙", ["濛", "灰蒙", "空蒙", "蒙蒙", "迷蒙", "弥蒙", "蒙雾"], ["矇", "欺蒙", "蒙住", "蒙叟", "蒙敝", "蒙昧", "蒙混", "蒙瞀", "蒙瞢", "蒙瞽", "蒙蔽", "蒙胧", "蒙眬", "蒙骗"], ["懞", "蒙懂"]],
表: ["表", ["錶", "戴表", "手表", "秒表", "腕表", "表店", "跳表", "陀表", "怀表", "表带", "表厂", "表壳", "表炼", "表链", "钟表", "马表"]],
板: ["板", ["闆", "老板"]],
卷: ["卷", ["捲", "卷入", "卷起", "龙卷风", "席卷", "蛋卷", "花卷", "袭卷", "卷款", "卷发", "卷走", "卷进", "卷曲", "卷舌", "烟卷"]],
酸: ["酸", ["痠", "酸软", "酸痛", "腰酸背痛", "脚酸", "背酸", "手酸"]],
仇: ["仇", ["讎", "复仇", "仇恨", "报仇", "仇敌"]],
几: ["几", ["幾", "几位", "几个", "几点", "几多", "几对", "几种", "几号", "几年", "几本", "几天", "几首", "几倍", "几何", "几时", "几日", "无几", "几内亚", "几家", "几回", "几斤", "几岁", "几番", "几次", "几率", "几许", "几乎", "庶几", "几十", "几百", "几千", "几万", "几亿"]],
背: ["背", ["揹", "背负", "背黑锅", "背包"]],
衔: ["銜", ["啣", "结草衔环", "衔着"]],
构: ["構", ["搆", "构陷", "构思", "构怨"]],
};

// prettier-ignore
const vocabularyConversion = {
/* Tech */
鼠标: "滑鼠", 硬盘: "硬碟", 磁盘: "磁碟", 打印: "列印", 复印: "影印", 搜索: "搜尋", 设置: "設定", 视频: "影片", 程序: "程式", 固件: "韌體", 芯片: "晶片", 登录: "登入", 短信: "簡訊", 带宽: "頻寬", 宽带: "寬頻", 字体: "字型", 光盘: "光碟", 音频: "音訊", 屏幕: "熒幕", 充电宝: "尿袋", U盘: "USB 手指", 卸载: "解除安裝", 点赞: "撳 like", 微博: "Weibo", 文件夹: "檔案夾", 联系人: "聯絡人", 服务器: "伺服器", 發信息: "傳簡訊", 信息: "資訊 / 訊息", 抖音: "TikTok", 微信: "WeChat", 播客: "Podcast", 支付宝: "Alipay", 局域网: "區域網絡", 笔记本: "筆記型電腦", 台式机: "桌上型電腦", 程序员: "程式設計師", 操作系统: "作業系統", 文件系统: "檔案系統", 博主: "content creator", up主: "content creator", Up主: "content creator", UP主: "content creator", 公众号: "official account",
/* Generic */
隐私: "私隱", 塑料: "塑膠", 发卡: "髮夾", 舞娘: "舞孃", 秋千: "鞦韆", 拐杖: "枴杖", 胡同: "衚衕", 个旧: "箇舊", 朱砂: "硃砂", 估计: "猜測", 申根: "神根", 土豆: "薯仔", 梅西: "美斯", 简历: "履歷", 打伞: "擔遮", 打车: "叫車", 奔驰: "平治", 左拐: "轉左", 右拐: "轉右", 打包: "外帶", 外卖: "外送", 很火: "很紅", 包间: "卡位", 奶酪: "芝士", 盒饭: "飯盒", 夜宵: "宵夜", 冰棍: "冰棒", 格斗: "挌鬥", 献血: "捐血", 台球: "桌球", 蛙泳: "蛙式", 排插: "拖板", 输液: "吊鹽水", 豆腐脑: "豆花", 冰激淋: "雪糕", 西红柿: "蕃茄", 自行车: "單車", 出租车: "的士", 公交车: "巴士", 摩托车: "電單車", 幼儿园: "幼稚園", 公安局: "警察局", 换乘站: "轉車站", 猕猴桃: "奇異果", 西兰花: "椰菜花", 疯牛病: "狂牛病", 自由泳: "自由式", 够不到: "搆不到", 够不着: "搆不着", 维生素: "維他命", 特拉斯: "卓慧思", 洗面奶: "洗面乳", 洗发水: "洗髮乳", 打底裤: "内搭褲", 本科生: "大學生", 宇航员: "太空人", 超声波: "超音波", B超: "超音波檢查", 让一下: "唔該借歪", 创可贴: "藥水膠布", 保质期: "保存期限", 泰坦尼克: "鐵達尼", 知识产权: "智慧財產權",
/* Northern dialect */
啥: "乜", 咋: "點", 咱: "我哋", 甭: "唔使", 倒霉: "衰", 忽悠: "蝦", 牛B: "犀利", 傻B: "戇鳩", 逗B: "盞鬼", 咋办: "點算", 咋整: "點攪", 咋样: "點樣", 咱们: "我哋", 老哥: "大佬", 逗比: "盞鬼", 逗逼: "盞鬼", 牛逼: "犀利", 膈应: "核突", 搁这: "喺度", 傻逼: "戇鳩", 好歹: "橫豎", 胖子: "肥仔", 好使: "好用", 老铁: "手足", 啥玩意: "乜嘢", 挺: "挺（幾）", "挺（幾）": "挺（幾）", 挺好的: "幾好的",
/* Place names */
同胞: "華人", 侨胞: "華僑", 内地: "中國", 长征: "流竄", 老挝: "寮國", 在京: "在北京", 中国大陆: "中國", 祖国内地: "中國", 祖国大地: "中國", 中国内地: "中國", 中国台湾: "台灣", 中国香港: "香港", 中国澳门: "澳門", 中华台北: "台灣", 抗美援朝: "韓戰", 新中国: "北京中國", 北京时间: "本港時間", 中南半岛: "印度支那", 抗日战争: "中日戰爭", 两岸关系: "中台關係", 解放战争: "國共內戰", 十月革命: "十月政變", 中华人民共和国: "北京中國",
};

(() => {
	("use strict");
	if (window.stcascInited) return;
	if (window.top != window.self) {
		try {
			if (window.self.innerWidth < 300 || window.self.innerHeight < 300) return;
		} catch (error) {
			return;
		}
	}
	window.stcascInited = true;

	class StorageManager {
		constructor() {
			this.currentDomain = window.location.hostname;
			this._GM_registerMenuCommand = this._initializeMenuCommand();
			this.storage = this._initializeStorage();
		}

		_initializeMenuCommand() {
			if (typeof GM_registerMenuCommand != "undefined") {
				return GM_registerMenuCommand;
			} else if (typeof GM != "undefined" && typeof GM.registerMenuCommand != "undefined") {
				return GM.registerMenuCommand;
			} else {
				return (s, f) => {};
			}
		}

		_initializeStorage() {
			return {
				supportGM: typeof GM_getValue == "function" && typeof GM_getValue("a", "b") != "undefined",
				supportGMPromise:
					typeof GM != "undefined" &&
					typeof GM.getValue == "function" &&
					typeof GM.getValue("a", "b") != "undefined",
				mxAppStorage: (function () {
					try {
						return window.external.mxGetRuntime().storage;
					} catch (e) {}
				})(),
				operaUJSStorage: (function () {
					try {
						return window.opera.scriptStorage;
					} catch (e) {}
				})(),
				setItem: function (key, value) {
					if (this.supportGM) {
						GM_setValue(key, value);
						if (value === "" && typeof GM_deleteValue != "undefined") {
							GM_deleteValue(key);
						}
					} else if (this.supportGMPromise) {
						GM.setValue(key, value);
						if (value === "" && typeof GM != "undefined" && typeof GM.deleteValue != "undefined") {
							GM.deleteValue(key);
						}
					} else if (window.localStorage) {
						window.localStorage.setItem(key, value);
					} else if (this.operaUJSStorage) {
						this.operaUJSStorage.setItem(key, value);
					} else if (this.mxAppStorage) {
						this.mxAppStorage.setConfig(key, value);
					}
				},
				getItem: function (key, callback) {
					var value;
					if (this.supportGM) {
						value = GM_getValue(key);
					} else if (this.supportGMPromise) {
						value = GM.getValue(key).then((GMValue) => callback(GMValue));
						return;
					} else if (window.localStorage) {
						value = window.localStorage.getItem(key);
					} else if (this.operaUJSStorage) {
						value = this.operaUJSStorage.getItem(key);
					} else if (this.mxAppStorage) {
						value = this.mxAppStorage.getConfig(key);
					}
					callback(value);
				},
			};
		}

		// Per-domain settings management
		// Storage structure: { "domain": { "s2tConversionDisabled": boolean, "autoSpacingDisabled": boolean } }
		getDomainSetting(domain, callback) {
			this.storage.getItem("domainSettings", (settingsData) => {
				let allSettings = {};
				try {
					allSettings = settingsData ? settingsData : {};
				} catch (e) {
					console.warn("Failed to parse domain settings:", e);
					allSettings = {};
				}

				const domainSettings = allSettings[domain] || {};
				const s2tConversionDisabled =
					domainSettings.s2tConversionDisabled !== undefined ? domainSettings.s2tConversionDisabled : false;
				const autoSpacingDisabled =
					domainSettings.autoSpacingDisabled !== undefined ? domainSettings.autoSpacingDisabled : false;
				callback({ s2tConversionDisabled, autoSpacingDisabled });
			});
		}

		setDomainSetting(domain, settings) {
			this.storage.getItem("domainSettings", (settingsData) => {
				let allSettings = {};
				try {
					allSettings = settingsData ? settingsData : {};
				} catch (e) {
					console.warn("Failed to parse domain settings:", e);
					allSettings = {};
				}

				allSettings[domain] = settings;
				this.storage.setItem("domainSettings", allSettings);
			});
		}

		registerMenuCommand(text, callback) {
			this._GM_registerMenuCommand(text, callback);
		}
	}

	class S2tConverter {
		constructor() {
			this.lang = ["zh", "zh-cn", "zh-hans", "zh-sg", "zh-my", "zh-hk", "zh-mo", "zh-tw", "zh-hant"];
			this.dictionary = {};
			this.vocabularyTree = {};
			this.observer = null;
		}

		convertString(originalString) {
			if (!originalString) return "";
			var string = "",
				char;
			for (var i = 0; i < originalString.length; i++) {
				char = originalString.charAt(i);
				let search = this.vocabularyTree[char],
					searchIndex = i,
					hasMatch = false;
				while (search && searchIndex < originalString.length) {
					let downTree = null;
					if (searchIndex < originalString.length - 1) {
						downTree = search[originalString.charAt(searchIndex + 1)];
					}
					if (!downTree) {
						if (search.end) {
							hasMatch = true;
							i = searchIndex;
							string += search.end;
						}
						break;
					}
					searchIndex++;
					search = downTree;
				}
				if (hasMatch) {
					continue;
				}
				if (char.charCodeAt(0) > 10000) {
					var tChar = this.dictionary[char],
						sc2tcItem = contextualConversion[char];
					if (tChar || sc2tcItem) {
						var newChar = "";
						if (sc2tcItem) {
							if (sc2tcItem.length == 1) {
								newChar = sc2tcItem;
							} else {
								var defaultChar = sc2tcItem[0],
									char_f = [],
									char_b = [],
									r = i;
								while (--r >= 0 && char_f.length < 3) {
									char_f.push(originalString.charAt(r));
								}
								r = i;
								while (++r < originalString.length && char_b.length < 3) {
									char_b.push(originalString.charAt(r));
								}
								for (var j = 1; j < sc2tcItem.length; j++) {
									var others = sc2tcItem[j],
										otherChar = others[0];
									for (var k = 1; k < others.length; k++) {
										var curOther = others[k],
											fadd = curOther.indexOf(char),
											badd = curOther.length - 1 - fadd,
											x = 0;
										var processChar = char;
										while (fadd-- > 0) {
											if (char_f[x]) processChar = char_f[x] + processChar;
										}
										x = 0;
										while (badd-- > 0) {
											if (char_b[x]) processChar += char_b[x];
										}
										if (processChar.indexOf(curOther) != -1) {
											newChar = otherChar;
											break;
										}
									}
									if (newChar) break;
								}
								if (!newChar) newChar = defaultChar;
							}
						} else {
							newChar = tChar;
						}
						string += newChar;
					} else string += char;
				} else string += char;
			}
			return string;
		}

		convertTextInChildNodes(parentNode = null) {
			var childNodes;
			if (parentNode) {
				childNodes = parentNode.nodeType == Node.TEXT_NODE ? [parentNode] : parentNode.childNodes;
			} else {
				document.title = this.convertString(document.title);
				childNodes = document.documentElement.childNodes;
			}
			if (!childNodes) return;

			for (let i = 0; i < childNodes.length; i++) {
				const childNode = childNodes[i];
				if (/BR|META|SCRIPT|HR|STYLE/i.test(childNode.nodeName)) continue;
				if (childNode?.getAttribute && childNode.getAttribute("translate") === "no") continue;
				if (childNode?.title) {
					const ElementTitle = this.convertString(childNode.title);
					if (childNode.title != ElementTitle) childNode.title = ElementTitle;
				}
				if (childNode?.alt) {
					const elementAlt = this.convertString(childNode.alt);
					if (childNode.alt != elementAlt) childNode.alt = elementAlt;
				}
				if (childNode?.hasAttribute && childNode.hasAttribute("placeholder")) {
					const oldPlaceholder = childNode.getAttribute("placeholder");
					const elementPlaceholder = this.convertString(oldPlaceholder);
					if (oldPlaceholder != elementPlaceholder) childNode.setAttribute("placeholder", elementPlaceholder);
				}
				if (childNode?.hasAttribute && childNode.hasAttribute("lang")) {
					const elementLang = childNode.getAttribute("lang")?.toLowerCase();
					if (this.lang.includes(elementLang)) childNode.removeAttribute("lang");
				}
				if (/TEXTAREA/i.test(childNode.nodeName) || childNode?.contentEditable == "true") continue;
				if (
					/INPUT/i.test(childNode.nodeName) &&
					childNode.value !== "" &&
					childNode.type != "text" &&
					childNode.type != "search" &&
					childNode.type != "hidden"
				) {
					const elementValue = this.convertString(childNode.value);
					if (childNode.value != elementValue) childNode.value = elementValue;
				} else if (childNode.nodeType == Node.TEXT_NODE) {
					const elementData = this.convertString(childNode.data);
					if (childNode.data != elementData) childNode.data = elementData;
				} else {
					this.convertTextInChildNodes(childNode);
				}
			}
		}

		initialiseDictionaries(storage) {
			// Initialise character dictionary
			storage.getItem("dictionary", (dictionary_stored) => {
				const updateDictionary = () => {
					for (let i = 0; i < simplifiedCharacters.length; i++) {
						const simplifiedCharacter = simplifiedCharacters[i];
						const traditionalCharacter = traditionalCharacters[i];
						if (!(simplifiedCharacter in this.dictionary))
							this.dictionary[simplifiedCharacter] = traditionalCharacter;
					}
					storage.setItem("dictionary", this.dictionary);
					storage.setItem("dictionary_date", Date.now());
				};

				if (!dictionary_stored) {
					updateDictionary();
				} else {
					storage.getItem("dictionary_date", (dictionary_date_stored) => {
						const oneDayAgo = Date.now() - 86400000;
						if (!dictionary_date_stored || dictionary_date_stored < oneDayAgo) {
							updateDictionary();
						} else {
							this.dictionary = dictionary_stored;
						}
					});
				}
			});

			// Initialize vocabulary tree
			storage.getItem("vocabularyConversionTree", (vocabularyTree_stored) => {
				const updateVocabularyTree = () => {
					for (const key in vocabularyConversion) {
						const value = vocabularyConversion[key];
						let curTree = this.vocabularyTree;
						for (let i = 0; i < key.length; i++) {
							let newTree = {};
							if (i == key.length - 1) newTree = { end: value };
							const curKey = key.charAt(i);
							const branch = curTree[curKey];
							if (!branch) {
								curTree[curKey] = newTree;
								curTree = newTree;
							} else {
								curTree = branch;
							}
						}
					}
					storage.setItem("vocabularyTree", this.vocabularyTree);
					storage.setItem("vocabularyTree_date", Date.now());
				};

				if (!vocabularyTree_stored) {
					updateVocabularyTree();
				} else {
					storage.getItem("vocabularyTree_date", (vocabularyTree_date_stored) => {
						if (!vocabularyTree_date_stored || vocabularyTree_date_stored < Date.now() - 86400000) {
							updateVocabularyTree();
						} else {
							this.vocabularyTree = vocabularyTree_stored;
						}
					});
				}
			});
		}

		start() {
			this.convertTextInChildNodes();

			// Set up mutation observer for automatic conversion on content changes
			if (!this.observer) {
				const MutationObserver =
					window.MutationObserver ?? window.WebKitMutationObserver ?? window.MozMutationObserver;
				this.observer = new MutationObserver((mutations) => {
					mutations.map((mutation) => {
						if (mutation.type === "characterData") {
							let targetNode = mutation.target;
							let parentNode = targetNode && targetNode.parentNode;
							if (!parentNode) return;
							while (targetNode) {
								if (targetNode.contentEditable == "true") return;
								if (targetNode.nodeName.toUpperCase() == "BODY") break;
								targetNode = targetNode.parentNode;
							}
							this.convertTextInChildNodes(parentNode);
						}
						if (mutation.addedNodes) {
							[].forEach.call(mutation.addedNodes, (item) => {
								this.convertTextInChildNodes(item);
							});
						}
					});
				});
				this.observer.observe(document.body, {
					childList: true,
					subtree: true,
					characterData: true,
				});
			}
		}
	}

	class AutoSpacer {
		start() {
			pangu.autoSpacingPage();
		}
	}

	class WebpageProcessor {
		constructor(s2tConverter, autoSpacer) {
			this.s2tConverter = s2tConverter;
			this.autoSpacer = autoSpacer;
			this.isS2tConversionDisabled = false;
			this.isAutoSpacingDisabled = false;
		}

		setSettings(s2tDisabled, spacingDisabled) {
			this.isS2tConversionDisabled = s2tDisabled;
			this.isAutoSpacingDisabled = spacingDisabled;
		}

		getSettings() {
			return {
				isS2tConversionDisabled: this.isS2tConversionDisabled,
				isAutoSpacingDisabled: this.isAutoSpacingDisabled,
			};
		}

		processWebpage() {
			if (!this.isAutoSpacingDisabled) {
				this.autoSpacer.start();
			}
			if (!this.isS2tConversionDisabled) {
				this.s2tConverter.start();
			}
		}

		run() {
			setTimeout(() => {
				const loadHandler = () => {
					if (document.readyState !== "complete") return;
					document.removeEventListener("readystatechange", loadHandler);
					this.processWebpage();
				};

				if (document.readyState !== "complete") {
					document.addEventListener("readystatechange", loadHandler);
					return;
				} else {
					this.processWebpage();
				}
			}, 50);
		}
	}

	function run() {
		const storageManager = new StorageManager();
		const s2tConverter = new S2tConverter();
		const autoSpacer = new AutoSpacer();
		const webpageProcessor = new WebpageProcessor(s2tConverter, autoSpacer);

		s2tConverter.initialiseDictionaries(storageManager.storage);

		// Load domain-specific settings and start the application
		storageManager.getDomainSetting(storageManager.currentDomain, (settings) => {
			const { s2tConversionDisabled, autoSpacingDisabled } = settings;
			webpageProcessor.setSettings(s2tConversionDisabled, autoSpacingDisabled);
			webpageProcessor.run();
			if (window.top != window.self) return;
			const processorSettings = webpageProcessor.getSettings();

			storageManager.registerMenuCommand(
				processorSettings.isS2tConversionDisabled ? "Enable s2t conversion" : "Disable s2t conversion",
				() => {
					const newValue = !processorSettings.isS2tConversionDisabled;
					storageManager.setDomainSetting(storageManager.currentDomain, {
						s2tConversionDisabled: newValue,
						autoSpacingDisabled: settings.autoSpacingDisabled,
					});
					location.reload();
				}
			);

			storageManager.registerMenuCommand(
				processorSettings.isAutoSpacingDisabled ? "Enable auto spacing" : "Disable auto spacing",
				() => {
					const newValue = !processorSettings.isAutoSpacingDisabled;
					storageManager.setDomainSetting(storageManager.currentDomain, {
						s2tConversionDisabled: settings.s2tConversionDisabled,
						autoSpacingDisabled: newValue,
					});
					location.reload();
				}
			);
		});
	}

	run();
})();
