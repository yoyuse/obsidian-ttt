/* eslint-disable no-irregular-whitespace */
// import { App, Editor, EditorSelection, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { Editor, EditorSelection, MarkdownView, Plugin } from 'obsidian';

// Remember to rename these classes and interfaces!

interface TTTPluginSettings {
	tttSetting: string;
}

const DEFAULT_SETTINGS: TTTPluginSettings = {
	tttSetting: 'default'
}

export default class TTTPlugin extends Plugin {
	settings: TTTPluginSettings;
	ttt: TTT;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		/*
		this.addSettingTab(new TTTSettingTab(this.app, this));
		 */

		// Setup ttt
		this.ttt = new TTT();

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'ttt-do-ttt',
			name: 'Do TTT',
			hotkeys: [
				{
					modifiers: ['Mod'],
					key: 'J'
				}
			],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				// console.log(editor.getSelection());
				this.ttt.doTTT(editor);
			}
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

/*
class TTTSettingTab extends PluginSettingTab {
	plugin: TTTPlugin;

	constructor(app: App, plugin: TTTPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for TTT plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.tttSetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.tttSetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
 */

////
const getSelectionBoundaries = (selection: EditorSelection) => {
	let { anchor: from, head: to } = selection;
	// in case user selects upwards
	if (from.line > to.line) { [from, to] = [to, from]; }
	// in case user selects backwards on the same line
	if (from.line === to.line && from.ch > to.ch) { [from, to] = [to, from]; }
	return { from, to };
}

////
type tableElement = string | tableElementArray;
// interface tableElementArray extends Array<tableElement> {}
type tableElementArray = Array<tableElement>

class TTT {
	readonly keys = "1234567890qwertyuiopasdfghjkl;zxcvbnm,./";
	readonly pattern = /(.*?)(:?([0-9a-z;,./]+))([^0-9a-z;,./]*)$/;
	public table: tableElement = [];

	readonly tta = `
*********************鄙***蛛**************
***************************************甦
**********瑕鴉**賽*******瞰嵌*匣**儚*礫****藪*哭？*
*************遽*****寃*******聘*靄*********筐
************辟痺*************悸************
********************櫻*******************
********************漱*****皺******訝疇*****
**********痰***焉輻****************熾*******
*******************蟲**佛**眈********翳*****
***********舊*絋*饅**痒******杞*祀爬*****靡*****
**隗**********颯****癪********峙佇****讀*孵檻*揄*
**墟**禮*躊****懺偕*凭**逞******疼*躓************
**鋏**躇******魎*莉*********廣*媚*************
*渕*****澹***釉*********彿****膀***橙*****燵***
*******炒****！*揶********螢*僭*條**褪*********
*********爛***珈****檬*鍮*謳嗚*****麒**薔*******
竟*****彗*孕朧徊**********薇４琥****罠**靱*癇*翅****
***軋**晰*茹**區*****雉**魍*）６***********涸*奢**
毯**惠**韆**鑪嶌*揉撥*******贄卍學*繹******經*絨*****
***********沐***譚****掟**朦***嬌*罹仄黎**乖*****
**綺*****稟***餡******蛉*咤***********餉******
*****嘔*****凰**珀聲*鑽****埃****嗜*****俯******
*********焙**抒棘********闊*咥*幇**********囮**
**********鵺*****昴**愕*聚**************騙榮*址
*****亞*謗*笏*應*攪毬*藝***眞*滲*椒**諍曰澁*********瞠
**熙***竄*****７**躾蹙***３*****翹頽**徨誦********
**********隕***櫟***壜**栞****鐵*戌蠅**菻*******
*蜩*********几（*８穽***顰***０*冰**誅*圓*―９會*裔***
*閾咎灌*********國****菫**弌５*舐籐**泄*****剪*****
**********檸*斂****谺**縷姜１２****憫*******狡*躰*
*****噤絣砒****樅*苺***戮*琲*****橇****拌齊*******
*****逍****棗*猾********柩*澤***淺********茉祓**
********渾**********鞦**簒暈**呻***證****瞼*冪*蝸
*****鉤***徘***紆***腱*翡敲棹絆蜻***烙贅膠頷*********
*******屏****寥**屁櫂蠍***捏***繚**翔*％*煌**瀾**游單
憑**********苻****遙*囁****貶****瑙*濱*胚矮***欒**
************肛*********儘**********訛賣***檜*
****************埓****萬*****燻踵**瑪****～*拗*
***************炬*唸***彷壺**苹*******眩**呟**芻
****辯*****轢*睨****慟*邊魑****樂***胱**********
`;
	readonly ttl = `
****************************************
****************************************
**********ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ******
**********ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ****
ЭЮЯ*******АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬ
эюя*******абвгдеёжзийклмнопрстуфхцчшщъыь
**********ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ****
**********αβγδεζηθικλμνξοπρστυφχψω******
****************************************
****************************************
*****肱腔膏砿閤叡餌荏云噂鴻劫壕濠轟穎盈瑛洩嬰麹鵠漉甑忽奄堰厭榎頴惚狛此坤梱
*****梧檎瑚醐鯉窺鵜卯迂烏佼倖勾喉垢蔚欝唄嘘碓宏巷庚昂晃閏瓜厩姥鰻杭梗浩糠紘
*****捲硯鍵鹸絃郁亥謂萎畏舷諺乎姑狐允鰯茨溢磯糊袴股胡菰吋蔭胤淫咽虎跨鈷伍吾
*****袈祁圭珪慧鮎綾絢飴虻桂畦稽繋罫闇按袷粟或荊詣頚戟隙椅惟夷杏鞍桁訣倦喧拳
*****矩躯駈駒喰葵姶挨娃唖寓串櫛釧屑葦旭渥穐茜窟沓轡窪熊姐斡梓鯵芦隈粂栗鍬卦
庇匪蕃磐挽*****簸樋誹緋斐蒼鎗捉袖其柊眉琵毘枇揃遜汰唾柁肘膝髭疋稗舵楕陀騨堆
媛桧逼畢弼*****廟豹瓢彪謬岱戴腿苔黛鰭蛭蒜鋲錨鯛醍鷹瀧啄冨埠瀕斌彬托琢鐸茸凧
葡撫阜芙斧*****淵蕗葺楓蕪蛸只叩辰巽焚扮吻鮒弗竪辿狸鱈樽碧僻頁蔽糞坦旦歎湛箪
娩篇箆蔑瞥*****輔甫圃鋪鞭綻耽蛋檀弛庖峯呆菩戊智蜘馳筑註蓬萌烹朋捧酎樗瀦猪苧
鉾鵬鳳鋒蜂*****釦穆睦頬吠凋喋寵帖暢哩昧幌殆勃牒蝶諜銚捗鱒柾鮪枕槙椎槌鎚栂掴
*****蒐讐蹴酋什鰹葛恰鰍梶戎夙峻竣舜兜鞄樺椛叶駿楯淳醇曙噛鎌釜蒲竃渚薯藷恕鋤
*****叱嫉悉蔀篠柿蛙馨浬骸偲柴屡蕊縞撹廓劃鈎蛎紗杓灼錫惹橿樫笠顎赫腫呪綬洲繍
*****燦珊纂讃餐恢廻駕蛾臥斬仔屍孜斯凱蟹芥晦魁獅爾痔而蒔鎧蓋碍崖咳汐鴫竺宍雫
*****埼碕鷺咋朔嘉伽俺牡桶柵窄鮭笹匙蝦茄苛禾珂拶*薩皐鯖峨俄霞迦嘩捌錆鮫晒撒
*****痕艮些叉嵯艶燕焔掩怨沙瑳裟坐挫旺甥鴛薗苑哉塞采犀砦臆荻鴎鴬襖冴阪堺榊肴
迄沫俣亦桝*****蜜箕蔓麿侭槻佃柘辻蔦牟粍稔蓑湊綴鍔椿潰壷牝姪冥椋鵡嬬紬吊剃悌
孟摸麺緬棉*****餅勿杢儲蒙挺梯汀碇禎悶貰籾*尤諦蹄鄭釘鼎弥耶爺冶也擢鏑溺轍填
佑愈鑓薮靖*****涌湧柚揖宥纏甜貼顛澱傭輿邑祐猷兎堵妬屠杜蓉耀熔楊妖菟賭鍍砥砺
螺淀沃慾遥*****蘭藍嵐洛莱塘套宕嶋梼葎裡璃梨李淘涛燈祷董侶琉溜劉掠蕩鐙憧撞萄
稜瞭梁凌亮*****琳燐淋遼諒鴇涜禿栃橡嶺伶瑠麟鱗椴鳶苫寅酉漣憐苓玲怜瀞噸惇敦沌
*****岨曾曽楚狙僅粁桐尭饗疏蘇遡叢爽禽欽欣錦巾宋匝惣掻槍玖狗倶衿芹漕痩糟綜聡
*****脊蹟碩蝉尖禦鋸渠笈灸撰栴煎煽穿匡兇僑侠亨箭羨腺舛詮蕎怯彊喬卿賎閃膳糎噌
*****諏厨逗翠錐誼蟻祇妓亀瑞嵩雛椙菅橘桔吃鞠掬頗雀裾摺凄汲仇黍杵砧棲栖醒脆戚
*****丞擾杖穣埴玩巌舘韓諌拭燭蝕尻晋伎雁贋翫癌榛疹秦芯塵徽稀畿毅嬉壬腎訊靭笥
*****哨嘗妾娼庄粥萱茅栢鴨廠捷昌梢樟桓柑姦侃苅樵湘菖蒋蕉莞翰竿潅澗裳醤鉦鍾鞘
呂蓮聯簾煉*****弄婁賂櫓魯遁頓呑那乍聾篭狼牢榔凪薙謎灘捺倭肋禄麓蝋鍋楢馴畷楠
亘亙鷲脇歪*****椀蕨藁詫鰐汝迩匂賑虹哺刹傲丼碗廿韮濡禰祢彙毀嘲嗅喩葱捻撚廼埜
拉憬慄惧恣*****璧鬱楷曖摯嚢膿覗蚤播羞緻籠箋瘍杷琶罵芭盃辣踪貪諧訃牌楳煤狽這
****錮**********蝿秤矧萩剥*****柏箔粕曝莫*****駁函硲箸肇
***************筈櫨畠溌醗*****筏鳩噺塙蛤*****隼叛斑氾釆
`;
	readonly ttr = `
****！１***********┯*******┠**┿┨*******┷**
****＠２*********┏*┳*┓*****┣┃━╋┫*****┗*┻*┛
****＃３*********┌*┬*┐*****├│─┼┤*****└*┴*┘
****＄４***********┰*******┝**╂┥*******┸**
****％５**********************************
****＾６****￣＾｀゜******＿¨´゛****************
****＆７****℃″′°Å*****£¢＄￥‰***************
****＊８****＜≦≧＞≠*****−÷×＋＝*****≪≒≡≫±*****
****（９****√♀♂∴∞*****⌒⊥∠∵∽*****∬∫∇∂∝*****
****）０****⊂⊆⊇⊃⇒*****∈∋∩∪⇔*****∃∀∧∨¬*****
**Θ*Ｑｑ*θ**冠乾刈且轄焦症礁祥肖寛堪喚勧勘衝訟詔鐘冗緩汗款棺憾剰壌嬢浄畳
**Ω*Ｗｗ*ω**嚇垣該涯慨巡遵緒叙徐隔郭穫獲殻匠升召奨宵褐滑渇括喝床彰抄掌晶
**Ε*Ｅｅ*ε**蚊菓箇稼禍醜柔汁獣銃悔怪塊餓雅叔淑粛塾俊劾皆拐戒懐准循旬殉潤
**Ρ*Ｒｒ*ρ**猿煙炎閲謁勺爵酌寂殊沖翁殴凹鉛狩珠趣儒囚架寡嫁佳憶愁臭舟襲酬
**Τ*Ｔｔ*τ**緯尉威偉握諮賜雌侍慈韻姻芋逸壱璽軸漆疾赦悦疫鋭詠渦斜煮遮蛇邪
**Ψ*Ｙｙ*ψ**沿液泳飲暗泥摘滴哲撤荷歌仮恩往迭殿吐塗斗閣貝絵灰芽奴怒凍唐塔
**Υ*Ｕｕ*υ**弓吸貴旗机悼搭桃棟痘訓鏡胸泣救筒到謄踏透穴潔敬径兄騰洞胴峠匿
**Ι*Ｉｉ*ι**穀鋼皇孝犬篤凸屯豚曇枝姉蚕菜祭鈍縄軟弐尿似飼詩詞至妊忍寧猫粘
**Ο*Ｏｏ*ο**拾尺謝捨磁悩濃覇婆廃署暑縮祝縦排杯輩培媒臣森城松昭賠陪伯拍泊
**Π*Ｐｐ*π**舌誠聖晴仁舶薄漠縛肌像祖銭染泉鉢髪罰閥伴損孫束息臓帆搬畔煩頒
**Α*Ａａ*α**憩契傾薫勲措疎租粗阻鶏蛍茎継渓僧双喪壮掃圏剣倹傑鯨挿槽燥荘葬
**Σ*Ｓｓ*σ**吟謹襟菌琴拙摂窃仙扇隅偶虞愚駆栓潜旋薦践桑繰靴掘屈銑漸禅繕塑
**Δ*Ｄｄ*δ**凶距拠拒糾枢据澄畝是狂挟恭峡叫姓征牲誓逝斤暁凝仰矯斉隻惜斥籍
**Φ*Ｆｆ*φ**儀偽騎飢輝尋尽迅酢吹犠欺擬戯宜帥*炊睡遂窮朽虐脚詰酔錘随髄崇
**Γ*Ｇｇ*γ**鑑貫艦肝缶醸錠嘱殖辱幾岐頑陥閑侵唇娠慎浸軌祈棄棋忌紳薪診辛刃
**Η*Ｈｈ*η**兆柱宙暖誕蛮妃扉披泌弟頂腸．潮疲碑罷微匹灯刀冬笛敵姫漂苗浜賓
****Ｊｊ****燃届毒銅童頻敏瓶怖扶拝俳，*馬浮符腐膚譜畑麦梅』肺賦赴附侮封
**Κ*Ｋｋ*κ**肥悲晩飯班伏覆沸噴墳腹貧氷俵鼻紛雰丙塀幣墓陛閉粉奮壁癖偏遍穂
**Λ*Ｌｌ*λ**幕妹牧棒亡慕簿倣俸峰勇油鳴…脈崩抱泡砲縫覧卵翌幼預胞芳褒飽乏
****：；****零隷林緑律傍剖坊妨帽劣暦齢麗霊忙冒紡肪膨炉錬廉裂烈謀僕墨撲朴
**Ζ*Ｚｚ*ζ**傘擦撮錯搾漬坪釣亭偵嗣伺暫桟惨貞呈堤廷抵脂肢紫祉旨締艇訂逓邸
**Ξ*Ｘｘ*ξ**鎖詐唆魂紺弔彫懲挑眺砕栽彩宰債聴脹超跳勅削咲剤載斎朕珍鎮陳墜
**Χ*Ｃｃ*χ**酵郊購貢衡胆鍛壇弾恥獄酷拷剛項痴稚畜逐秩昆恨婚墾腰窒嫡抽衷鋳
****Ｖｖ****孔坑侯碁悟泰滞胎逮滝洪控拘慌恒卓拓濯託諾肯絞稿硬溝但奪棚嘆淡
**Β*Ｂｂ*β**遣軒謙懸堅藻遭霜騒憎枯弧玄弦幻贈促俗賊堕娯呉鼓顧雇妥惰駄耐怠
**Ν*Ｎｎ*ν**漏浪楼廊露没奔翻凡盆*湾枠惑賄摩磨魔埋膜*****抹繭漫魅岬
**Μ*Ｍｍ*μ**；：‥｜‖妙眠矛霧婿〆仝〃／＼娘銘滅妄猛ヾヽゞゝ‐盲網耗黙紋
［｛｝］＜，****〔【】〕*匁厄躍柳愉《〈〉》『癒諭唯幽悠“‘’”*憂猶裕誘誉
＃＆＊＠＞．****♪♭♯†‡庸揚揺擁溶☆△□○◯窯踊抑翼羅　▽◇◎*裸雷酪濫吏
****？／****←↓↑→¶痢硫粒隆虜★▲■●§僚涼猟糧陵〓▼◆※〒倫厘塁涙励
`;
	readonly ttc = `
**********ヲゥヴヂヅ簡承快包唱ぱぴぷぺぽ朱陣眼執岳ぁぃぅぇぉ欲迫留替還
**********哀逢宛囲庵徴章否納暮慰為陰隠胃遅鶴繁紹刑*****巣災列沼更
**********暇牙壊較寒触候歯頼憲我掛敢甘患甲鹿誌夢弱瓦****茂恋刻?占
**※*******啓掲携劇賢宗途筆逃勉兼嫌顕牽厳致貨招卸雲*****述脳豆辞箱
**********把伐避卑藩植複里寝罪菱紐描憤弊汎絡季阿窓*****朗老看献矢
**********酸貿攻盤汽*****桜典採君犯*****呼紀房去秒*****
**********昼捜焼帯換索冊皿賛*瀬博謡純余衰趨垂粋寸幅破績疑範*****
**********炭異闘易延射需輯瞬盾鳥筋希副堀滋湿甚*瞳歓郡識ぢ核*****
**********稲隣奈速雪濁詑蓄貯虫催忠仏盟肩沈添徹爪陶功抗属綿影*****
**********湯旧夕拡互慢迷戻羊*障乳察標療己已巳巴*盗幡衣離麻*****
ヮ丑鬼孤奉湖端刷震弘果概武風細害撃浴積故収若指ぎ思病常寺停河徳械帝読族帰監竹ゅ志
ヰ臼虚誇某礼飾寿扱痛告買残階古賃折秀程鉱際雄氏格術終張質領置渡刊始鈴丁庁寄注修抜
ヱ宴狭黄貌著郵順片票策詳両能利整追糸断提太査丸次広起薬づ容供守訪了恐未昨裁介究航
ヵ縁脅后卜移塩危札訴首由在論ペ軽隊春低児園ふ続習門路防港玉試登融極督才跡達具答層
ヶ曳驚耕*郷群砂乞遺農死!増ゃ評角幸減敷船賞ェ火聞越得条右席退雨熱況返ゲ芝失養深
請尚舎布姿**庶*欄歩キやコナ佐接記モ無中わうあ本むケ話べ期店全バ後問洗響司復担
境賀喜苦絶*星粧乃龍回せ出山金法備朝資石スラ4こさ南式座民ゾ持じ部間ム羽忘迎並陸
系岸幹圧密*析丈如略務区タ者マ数最知士屋も東)6ら原戦線ソ歳町自六場七個討華浦巻
探責丘恵秘*遷称尼慮島百手発和郎急ワ費解お生十学高駅関ダ点強所議経ニ住医史許ユ競
象漁糖固押*宣蒸帳累開木保立女談験送ィ募定ろリ月シ物男橋遇係ほ明動産北静環補冷護
ゎ於奇巧*償紅舗輪則報音案横崎服変限逆令種宅料受英勢輸基足婦件宮局向割億色左ぬ根
ゐ汚既克*欧傷充倒存紙王曲興白声審研企違岡熟土予ボ必形好草段友伊頭府ぶ録貸態展様
ゑ乙菊懇*努豪喫操倍館放情刺ぐ任改労精装結待活切加講助味築衛卒求配富番赤販花警独
*穏却困*底維腕柄牛夜々引側官検昇統ざ然進取ね育室愛▽宝観額初技黒直望想編栄型止
**享昏*亜脱暴魚釈位応職覚球豊芸役印確真科参池少管流争言渋慣写院倉元消仕ザ誰堂
盛益康邦衆*鼠***給分7き上美宿セ神優3ーい。で要連デ車主行通だ新事支先調組銀
革援徒舞節*曹***員よかっく題制運び公とし、▲は設鉄現成映ドカり」田協多混選以
突周景雑杉*奏***どル(日8井集ツ打品〇たの0に水教エ天書円社—9会用商ポ党ヌ
温域処漢肉*尊***代千ト国え洋安特勤語て一5・な藤力他世可小野め子前表ハ決択営
捕荒ぜ緊除;****レアれ二年実画谷ャ演るが12を有ベ度文へジ同大五そ正交ミ体治
*****禁絹批就綱欠財従適母爆陽ァ殺券ヒ及投込転素毛等板伝ヨ判済説休図之州例字
*****硝被慶駐潟夏針骨類奥仲構導負悪江久義沢空兵永浅客庭誤規吉週省挙末払満材
*****樹源渉揮創彼裏厚御因茶旅認何秋別蔵算軍性専申頃師課証感ゆ号央険ぼ乗津過
*****句願竜丹背妻居顔宇酒率施健履非考早半青使親袋落税着含値器葉福ゼ街庫準諸
*****礎臨併鮮皮善差量推伸比曜尾般便権造県清級寮良命飛坂%ギ照派毎波免状遊単
依織譲激測*****相付内九サ昔遠序耳示ッロんけ業ホ私村ノ近海当不委気ヤ再団戸身
繊父ヘ干血*****家プ工名建短ォ振授即人クまイ時共ゴガ完外道理合化売心ネ計ひピ
借枚模彦散,****的ば八川パ岩将練版難三万ンす「ブ来製重米ずメ面ビ下界〜夫ょ勝
須乱降均笑.****対ュテ機第巨ぞ念効普京方つ電長平信校約ョ西ウ政目都意口食価反
訳香走又弁/****歴作見チ入敗塚働視辺ちフ四地み楽午ご各光げグオ市株今台総与ズ
`;

	private makeSubtable(ttx: string, fn: (ch: string) => tableElement): tableElement {
		return ttx.replace(/^\n|\n$/, "").split(/\n/).map((s) => s.split("").map(fn));
	}

	private makeTable() {
		const ttatable = this.makeSubtable(this.tta, (ch) => { return ch === "*" ? "" : ch; });
		const ttltable = this.makeSubtable(this.ttl, (ch) => { return ch === "*" ? "" : ch; });
		const ttrtable = this.makeSubtable(this.ttr, (ch) => { return ch === "*" ? "" : ch; });
		const ttttable = this.makeSubtable(this.ttc, (ch) => {
			switch (ch) {
				case "*": return "";
				case "※": return ttatable;
				case "▽": return ttltable;
				case "▲": return ttrtable;
				default: return ch;
			}
		});
		this.table = ttttable;
	}

    constructor() {
        this.makeTable();
		// new Notice('TTT Ready');
    }

	public decode(str: string): [string, string] {
		let t: tableElement = this.table;
		let dst = "";
		let rem = "";
		for (const ch of str.split("")) {
			rem += ch;
			const k = this.keys.indexOf(ch);
			if (k < 0) {
				t = this.table;
				dst += ch;
				rem = "";
			} else {
				t = t[k];
				if (typeof t === "string") {
					dst += t;
					rem = "";
					t = this.table;
				} else if (!Array.isArray(t)) {
					t = this.table;
				}
			}
		}
		return [dst, rem];
	}

	public decodeString(str: string): string {
		return this.decode(str)[0];
	}

	public doTTTSub(editor: Editor, selection: EditorSelection): EditorSelection {
		let { from, to } = getSelectionBoundaries(selection);
		let selectedText = editor.getRange(from, to);
		if (selectedText.length === 0) {
			const bol = { line: from.line, ch: 0 };
			const left = editor.getRange(bol, to);
			const m = this.pattern.exec(left);
			if (!m) { return { anchor: from, head: to }; }
			const [src, body, tail] = [m[2], m[3], m[4]];
			selectedText = body;
			from = { line: from.line, ch: from.ch - (src + tail).length };
			to = { line: from.line, ch: from.ch + src.length };
		}
		const replacementText = this.decodeString(selectedText);
		editor.replaceRange(replacementText, from, to);
		return { anchor: from, head: to };
	}

	public doTTT(editor: Editor): void {
		const selections = editor.listSelections().filter(selection => {
			this.doTTTSub(editor, selection);
		});
		editor.setSelections(selections);
	}
}
