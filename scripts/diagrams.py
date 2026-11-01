# 図解SVGを生成するスクリプト。 python3 scripts/diagrams.py で public/images/ に出力されます。
import os
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT, exist_ok=True)
S, R, Y, B, K, G, GR = "#1a1a1a", "#d8352a", "#ffe45c", "#2f5dab", "#eadfc6", "#2E7D4F", "#5b5b57"
FONT = "'Klee One','Hiragino Maru Gothic ProN','Yu Gothic',Meiryo,'Noto Sans CJK JP',sans-serif"

def esc(t): return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

class D:
    def __init__(s, w, h, title, alt):
        s.w, s.h, s.title, s.alt, s.b = w, h, title, alt, []
    def add(s, x): s.b.append(x)
    def text(s, x, y, t, fs=18, anchor="middle", fill=S, bold=False):
        wt = ' font-weight="700"' if bold else ""
        s.add(f'<text x="{x}" y="{round(y,1)}" font-size="{fs}" text-anchor="{anchor}" fill="{fill}"{wt}>{esc(t)}</text>')
    def box(s, x, y, w, h, lines=None, fill="#fff", fs=18, fc=S, bold=False, stroke=S, shadow=True):
        if shadow: s.add(f'<rect x="{x+4}" y="{y+4}" width="{w}" height="{h}" fill="{S}"/>')
        s.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{stroke}" stroke-width="2.5"/>')
        if lines:
            if isinstance(lines, str): lines = [lines]
            lh = fs * 1.35
            y0 = y + (h - lh * len(lines)) / 2 + fs * 0.95
            for i, l in enumerate(lines): s.text(x + w / 2, y0 + i * lh, l, fs, "middle", fc, bold)
    def arrow(s, x1, y1, x2, y2, dash=False):
        d = ' stroke-dasharray="6 5"' if dash else ""
        s.add(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{S}" stroke-width="2.5"{d} marker-end="url(#ah)"/>')
    def line(s, x1, y1, x2, y2):
        s.add(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{S}" stroke-width="2.5"/>')
    def path(s, d, arrow=True):
        m = ' marker-end="url(#ah)"' if arrow else ""
        s.add(f'<path d="{d}" fill="none" stroke="{S}" stroke-width="2.5"{m}/>')
    def diamond(s, cx, cy, hw, hh, lines, fs=15, fill="#fff"):
        s.add(f'<polygon points="{cx},{cy-hh} {cx+hw},{cy} {cx},{cy+hh} {cx-hw},{cy}" fill="{fill}" stroke="{S}" stroke-width="2.5"/>')
        lh = fs * 1.35; y0 = cy - lh * len(lines) / 2 + fs * 0.95
        for i, l in enumerate(lines): s.text(cx, y0 + i * lh, l, fs)
    def op(s, x, y, t="×"): s.text(x, y, t, 26, bold=True, fill=R)
    def save(s, name):
        head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {s.w} {s.h}" width="{s.w}" height="{s.h}" '
                f'role="img" aria-label="{esc(s.alt)}" font-family="{FONT}">'
                f'<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">'
                f'<path d="M0,0 L10,5 L0,10 z" fill="{S}"/></marker></defs>'
                f'<rect width="{s.w}" height="{s.h}" fill="#fbf9f3"/>'
                f'<rect x="1.5" y="1.5" width="{s.w-3}" height="{s.h-3}" fill="none" stroke="{S}" stroke-width="3"/>'
                f'<rect x="18" y="14" width="52" height="30" rx="4" fill="none" stroke="{R}" stroke-width="3" transform="rotate(-3 44 29)"/>'
                f'<text x="44" y="36" font-size="18" font-weight="700" fill="{R}" text-anchor="middle" transform="rotate(-3 44 29)">図解</text>'
                f'<text x="86" y="38" font-size="21" font-weight="700" fill="{S}">{esc(s.title)}</text>')
        open(os.path.join(OUT, name), "w", encoding="utf-8").write(head + "".join(s.b) + "</svg>")

def numdot(d, x, y, n):
    d.add(f'<circle cx="{x}" cy="{y}" r="15" fill="{R}"/>'); d.text(x, y + 6, str(n), 16, fill="#fff", bold=True)

# 1 脱デジの5つの型
d = D(800, 300, "脱デジの5つの型", "脱デジの5つの型の図:紙に書く、置き場所を決める、先に予想を書く、紙の本を混ぜる、何もしない5分。まず1つだけ選ぶ。")
d.text(400, 90, "考える部分だけは、自分の手に残す", 20, bold=True)
for i, n in enumerate([["紙に", "書く"], ["置き場所", "を決める"], ["先に予想", "を書く"], ["紙の本", "を混ぜる"], ["何もしない", "5分"]]):
    x = 20 + i * 155; d.box(x, 115, 140, 110, n, fill=Y if i == 0 else "#fff", fs=19); numdot(d, x + 22, 115, i + 1)
d.text(400, 270, "全部やらなくていい。まず「1つだけ」選んで1週間", 17, fill=R, bold=True); d.save("zu-5-kata.svg")

# 2 AIに任せる線引き
d = D(800, 400, "AIに任せる/自分に残す 線引き", "AIに任せる作業と自分に残す判断を分ける図。やり直しがきく、正解がある作業は任せ、責任を自分が取る判断は残す。")
for i, t in enumerate(["やり直しがきく?", "正解がある?", "責任は自分が取る?"]): d.box(20 + i * 260, 70, 240, 50, t, fs=18, fill=K)
d.text(200, 152, "1・2が「はい」→ AIに任せる", 16, fill=B, bold=True); d.text(600, 152, "3が「はい」→ 自分に残す", 16, fill=R, bold=True)
d.box(20, 175, 360, 195, fill=Y); d.text(200, 208, "AIに任せる(作業)", 20, bold=True)
for i, t in enumerate(["下書き、言い回しの候補", "要約、表記ゆれの確認", "表の整形、集計の手順", "アイデアの数出し"]): d.text(45, 248 + i * 28, "・" + t, 17, "start")
d.box(420, 175, 360, 195, fill="#fff"); d.text(600, 208, "自分に残す(問いと判断)", 20, bold=True, fill=R)
for i, t in enumerate(["何を問うか", "どれを採用するか", "人の気持ちが絡む判断", "説明する責任がある内容"]): d.text(445, 248 + i * 28, "・" + t, 17, "start")
d.save("zu-ai-sakaime.svg")

# 3 手書き日記30日
d = D(800, 340, "手書き日記30日チャレンジ", "手書き日記30日チャレンジの図。1日3行(今日あったこと、気づいたこと、明日1つだけやること)と、1週間後、2週間後、30日後の記録公開の予定。")
d.box(30, 75, 340, 235, fill="#fff")
for i, t in enumerate(["1行目 今日あったこと", "2行目 気づいたこと", "3行目 明日1つだけやること"]):
    y = 130 + i * 55; d.text(50, y, t, 18, "start", bold=True); d.line(48, y + 12, 352, y + 12)
d.add(f'<line x1="40" y1="82" x2="40" y2="304" stroke="{R}" stroke-width="2"/>')
d.text(600, 112, "記録の公開予定", 19, bold=True); d.line(420, 205, 780, 205)
for x, a, b in [(450, "開始", "ルールを宣言"), (550, "1週間後", "つまずいた点"), (650, "2週間後", "ルール変更?"), (750, "30日後", "全体のまとめ")]:
    d.add(f'<circle cx="{x}" cy="205" r="9" fill="{R}" stroke="{S}" stroke-width="2"/>'); d.text(x, 180, a, 16, bold=True); d.text(x, 245, b, 14)
d.text(600, 300, "3行だけ。続かなくても、恥じるべからず", 16, fill=R, bold=True); d.save("zu-nikki-30.svg")

# 4 書き出しメモ
d = D(800, 270, "書き出しメモ 4ステップ(約5分)", "書き出しメモの4ステップ:テーマを書く10秒、書き出す1〜3分、丸で囲んで分ける1分、結論を一文にする1分。")
for i, (n, t) in enumerate([(["①テーマを", "書く"], "10秒"), (["②制限時間で", "書き出す"], "1〜3分"), (["③同じ仲間を", "丸で囲む"], "1分"), (["④結論を", "一文にする"], "1分")]):
    x = 20 + i * 200; d.box(x, 80, 170, 90, n, fs=18, fill=Y if i == 3 else "#fff"); d.box(x + 35, 195, 100, 34, t, fs=16, fill=K, shadow=False)
    if i < 3: d.arrow(x + 172, 125, x + 198, 125)
d.text(400, 258, "きれいに書かず、速く書く。1枚で終わらせる", 17, fill=R, bold=True); d.save("zu-kakidashi.svg")

# 5 先に予想
d = D(800, 330, "先に予想 → 調べる → ずれを見る", "先に予想を書く稽古の図。東京タワーの高さを250〜400mと予想し、答えは333mで、予想の幅に入っていた例。")
for i, t in enumerate(["①予想を書く", "②調べる", "③ずれを見る"]):
    d.box(40 + i * 260, 62, 200, 50, t, fs=18, fill=Y if i == 0 else "#fff")
    if i < 2: d.arrow(242 + i * 260, 87, 298 + i * 260, 87)
px = lambda m: 60 + (m - 200) * 2.72
d.text(400, 150, "例:東京タワーの高さ", 17, bold=True)
d.add(f'<rect x="{px(250)}" y="200" width="{px(400)-px(250)}" height="36" fill="{Y}" stroke="{S}" stroke-width="2"/>'); d.text(400, 186, "予想の幅 250〜400m", 16, bold=True)
d.line(60, 240, 740, 240)
for m in range(200, 451, 50): d.line(px(m), 240, px(m), 248); d.text(px(m), 268, f"{m}m", 14)
d.add(f'<line x1="{px(300)}" y1="200" x2="{px(300)}" y2="240" stroke="{B}" stroke-width="3"/>'); d.text(px(300) - 6, 306, "予想300m", 16, "end", B, True)
d.add(f'<line x1="{px(333)}" y1="200" x2="{px(333)}" y2="240" stroke="{R}" stroke-width="3"/>'); d.text(px(333) + 6, 306, "答え333m", 16, "start", R, True); d.save("zu-sakini-yoso.svg")

# 6 3つの問い
d = D(800, 350, "3つの問い", "3つの問いの図。テーマ『本を読めていない』に対し、なぜ(原因)、どうすれば(方法)、本当に(前提)の3つの問いを立てる。")
d.box(250, 62, 300, 56, "テーマ:本を読めていない", fs=19, fill=K)
for i, (n, q, f) in enumerate([(["なぜ?", "(原因)"], "なぜ時間がとれない?", "#fff"), (["どうすれば?", "(方法)"], "どうすれば15分確保できる?", Y), (["本当に?", "(前提)"], "目標が高すぎない?", "#fff")]):
    x = 20 + i * 260; d.box(x, 190, 240, 76, n, fs=19, fill=f); d.arrow(400, 122, x + 120, 188); d.text(x + 120, 305, q, 15)
d.text(400, 338, "3つのうち、いちばん答えたいものに丸をつける", 16, fill=R, bold=True); d.save("zu-mittsu-toi.svg")

# 7 3行要約
d = D(800, 300, "3行要約の型", "3行要約の図。長い文章を、結論、理由、使いどころの3行にまとめる。")
d.text(155, 76, "長い文章", 17, bold=True); d.box(30, 88, 250, 175, fill="#fff")
for i in range(7): d.add(f'<rect x="48" y="{106 + i * 22}" width="{214 if i % 3 != 2 else 150}" height="8" fill="#cfcac0"/>')
d.arrow(292, 175, 350, 175)
for i, (t, f) in enumerate([("① 結論:いちばん言いたいこと", Y), ("② 理由:その根拠", "#fff"), ("③ 使いどころ:自分ならどこで使う?", "#fff")]):
    d.box(365, 70 + i * 72, 415, 58, t, fs=17, fill=f)
d.text(572, 290, "各行40字以内。③が書けると、記憶に残る", 15, fill=R, bold=True); d.save("zu-3gyo.svg")

# 8 MECE
d = D(800, 385, "MECE:もれなく、ダブりなく", "MECEの図。年代で6つに分けるともれもダブりもない。学生、会社員、男性のように軸が混ざると重なりが出る。")
d.text(200, 80, "○ 軸が1つ(年代で分ける)", 17, bold=True, fill=G)
for i, t in enumerate(["19歳以下", "20代", "30代", "40代", "50代", "60歳以上"]): d.box(30 + (i % 3) * 120, 98 + (i // 3) * 95, 112, 85, t, fs=16, fill=Y if i % 2 == 0 else "#fff", shadow=False)
d.text(200, 320, "もれもダブりもない", 16, bold=True, fill=G)
d.text(600, 80, "× 軸が混ざる(立場+性別)", 17, bold=True, fill=R)
for cx, cy, c, lab, lx, ly in [(520, 190, B, "学生", 485, 165), (620, 190, "#f0b400", "会社員", 655, 165), (570, 265, R, "男性", 570, 300)]:
    d.add(f'<circle cx="{cx}" cy="{cy}" r="72" fill="{c}" fill-opacity="0.22" stroke="{S}" stroke-width="2.5"/>'); d.text(lx, ly, lab, 17, bold=True)
d.text(600, 372, "「男性の会社員」が両方に入る(ダブり)", 15, fill=R, bold=True); d.save("zu-mece.svg")

# 9 フェルミ入門
d = D(800, 300, "フェルミ推定 4ステップ", "フェルミ推定の図。1年のごはん茶碗の数を、1日の回数3回、1回1杯、365日の掛け算で約1,100杯と見積もる。")
for i, t in enumerate(["①分解", "②仮定", "③計算", "④検算"]):
    d.box(20 + i * 205, 62, 150, 44, t, fs=18, fill=Y if i == 0 else "#fff")
    if i < 3: d.arrow(172 + i * 205, 84, 223 + i * 205, 84)
for x, w, a, b in [(20, 160, "1日の回数", "3回"), (230, 160, "1回の杯数", "1杯"), (440, 130, "日数", "365日")]: d.box(x, 140, w, 84, [a, b], fs=19)
d.op(205, 192); d.op(415, 192); d.op(595, 192, "="); d.box(620, 140, 160, 84, ["1年の茶碗", "約1,100杯"], fs=19, fill=Y, bold=True)
d.text(400, 266, "検算:朝パンの日は1日2回 → 730杯。「700〜1,100杯」と範囲で答える", 16, fill=R, bold=True); d.save("zu-fermi-nyumon.svg")

# 10 フェルミ カフェ
d = D(800, 375, "駅前カフェの1日売上を2通りで見積もる", "フェルミ推定の図。席数20席×回転6.4回×700円で約9万円、通行人5,000人×入店率2%×700円で約7万円。2つとも同じ桁で、約8万円前後。")
for y, ttl, items, res in [(78, "方法A 席数から", [("席数", "20席"), ("回転数", "6.4回"), ("客単価", "700円")], "約9万円"), (178, "方法B 通行人から", [("通行人", "5,000人"), ("入店率", "2%"), ("客単価", "700円")], "約7万円")]:
    d.text(20, y - 8, ttl, 17, "start", B, True)
    for i, (a, b) in enumerate(items): d.box(20 + i * 170, y, 120, 64, [a, b], fs=17)
    d.op(165, y + 42); d.op(335, y + 42); d.op(505, y + 42, "="); d.box(530, y, 150, 64, res, fs=22, fill=Y, bold=True)
d.path("M680 110 H752 V318 H654"); d.path("M680 210 H722 V318", arrow=False)
d.box(100, 292, 550, 56, "2つとも同じ桁 → 「約8万円前後」と言える", fs=20, fill=Y, bold=True); d.save("zu-fermi-cafe.svg")

# 11 ロジックツリー
d = D(800, 360, "ロジックツリー:売上減の場所をしぼる", "ロジックツリーの図。売上は100万円から90万円に10%減。客数が8%減、客単価は約2%減。客数のうちリピート客が150人減っているのが主因。")
d.box(20, 150, 190, 84, ["売上", "100→90万円", "(-10%)"], fs=16, fill=K)
d.box(265, 76, 215, 84, ["客数", "2,000→1,840人", "(-8%)"], fs=16, fill=Y); d.box(265, 244, 215, 84, ["客単価", "500→約489円", "(-2%)"], fs=16)
d.box(545, 40, 235, 70, ["新規 600→590人", "(-10人)"], fs=16); d.box(545, 140, 235, 70, ["リピート 1,400→1,250人", "(-150人)"], fs=16, fill="#ffd6d2", stroke=R, bold=True)
d.arrow(212, 180, 263, 126); d.arrow(212, 205, 263, 274); d.arrow(482, 108, 543, 76); d.arrow(482, 130, 543, 172)
d.text(662, 245, "▲ ここが主因", 18, fill=R, bold=True); d.text(662, 275, "(客数減160人のうち150人)", 14); d.save("zu-logic-tree.svg")

# 12 ピラミッド
d = D(800, 390, "仮説思考とピラミッド構造", "ピラミッド構造の図。結論『新店への流出が主因』を、3つの根拠とそれぞれのデータで支える。")
d.box(210, 62, 380, 66, ["結論", "新店への流出が主因と考えられる"], fs=17, fill=Y, bold=True)
for i, (a, b, c) in enumerate([("根拠1", "開始時期が新店と一致", "日別のリピート客数"), ("根拠2", "平日の減少が大きい", "曜日別の客数"), ("根拠3", "品切れ・値上げは無関係", "品切れ・値上げの記録")]):
    x = 20 + i * 260; d.arrow(400, 130, x + 120, 178); d.box(x, 180, 240, 72, [a, b], fs=16); d.line(x + 120, 254, x + 120, 282); d.box(x, 284, 240, 46, c, fs=15, fill=K)
d.text(400, 362, "下から上へ「だから何?」(So What?)、上から下へ「なぜ?」(Why So?)で確かめる", 15, fill=R, bold=True)
d.text(400, 150, "", 1); d.save("zu-pyramid.svg")

# 13 課題設計
d = D(800, 360, "課題設計の5ステップ(実務)", "課題設計の図。ゴール設定、内訳の構造化、仮説、分析計画、優先度づけの5ステップで、依頼を分析できる問いに変える。")
steps = [(["①ゴール", "設定"], ["目的・指標", "・期限を", "確認する"]), (["②内訳を", "構造化"], ["内容別・時間帯", "別などに", "分ける"]), (["③仮説を", "立てる"], ["上位の原因を", "仮の答えとして", "置く"]),
         (["④分析", "計画"], ["必要なデータと", "集計の軸を", "決める"]), (["⑤優先度", "づけ"], ["削減見込み×", "実行しやすさ", "で並べる"])]
for i, (a, b) in enumerate(steps):
    x = 20 + i * 155; d.box(x, 70, 130, 70, a, fs=18, fill=Y if i == 0 else "#fff"); d.arrow(x + 65, 142, x + 65, 172); d.box(x, 175, 130, 110, b, fs=14, fill=K, shadow=False)
    if i < 4: d.arrow(x + 134, 105, x + 152, 105)
d.box(100, 305, 600, 44, "報告は結論から:約225件の削減が見込め、目標を達成できる", fs=17, fill=Y, bold=True); d.save("zu-kadai.svg")

# 14 AI式7ステップ
d = D(800, 410, "AIが答えを組み立てる7ステップ", "AIが難しい依頼に答えるときの7ステップの図。依頼を言い直す、足りない所を見つける、小さく分ける、仮定を置く、1つずつ答える、検算する、相手向けに並べる。")
def sb(x, y, n, t, sub, f="#fff"):
    d.box(x, y, 170, 112, fill=f); numdot(d, x + 20, y + 20, n)
    for i, l in enumerate(t): d.text(x + 85, y + 55 + i * 22, l, 17, bold=True)
    d.text(x + 85, y + 100, sub, 13, fill=GR)
R1 = [(["依頼を", "言い直す"], "本当の問いは?"), (["足りない所を", "見つける"], "聞く?仮定する?"), (["小さな問い", "に分ける"], "MECEに分解"), (["仮定を", "置く"], "数字・条件を明示")]
for i, (t, s_) in enumerate(R1): sb(20 + i * 200, 68, i + 1, t, s_, Y if i == 0 else "#fff"); 
for i in range(3): d.arrow(192 + i * 200, 124, 218 + i * 200, 124)
d.arrow(705, 182, 705, 228)
R2 = [(["1つずつ", "答える"], "見積もる・推論する"), (["検算", "する"], "桁・矛盾を確認"), (["相手向けに", "並べる"], "結論→根拠→次の一歩")]
for i, (t, s_) in enumerate(R2): sb(620 - i * 200, 230, i + 5, t, s_)
for i in range(2): d.arrow(618 - i * 200, 286, 392 - i * 200, 286)
d.arrow(218, 286, 192, 286); d.box(20, 230, 170, 112, ["答え"], fs=30, fill=R, fc="#fff", bold=True)
d.text(400, 378, "どこかでズレたら前に戻る(⑥でおかしいと気づいたら③④へ)", 16, fill=R, bold=True)
d.text(400, 400, "※ AIの内部の仕組みではなく、答え方の「進め方」を言葉にした型です", 13, fill=GR); d.save("zu-ai-7step.svg")

# 15 無理難題 売上2倍
d = D(800, 460, "「売上を2倍に」にAI式7ステップを当てはめる", "売上を2倍にしてという無理難題に7ステップを当てはめた図。言い直し、不明点の確認、分解、仮定、計算、検算、提案の順で、2倍は難しいが1.5倍なら現実的と提案する。")
rows = [("①言い直す", "「いつまでに、何の売上を2倍にするか」"), ("②足りない所", "期間・対象・現状の売上が不明"), ("③分ける", "売上 = 客数 × 客単価"), ("④仮定を置く", "1年後・既存店・現状は月100万円"),
        ("⑤1つずつ", "客数1.5倍 × 客単価約1.33倍 = 2倍"), ("⑥検算する", "客数1.5倍は届く?値上げで客は減らない?"), ("⑦並べる", "2倍は難しいが、1.5倍なら現実的と提案")]
for i, (a, b) in enumerate(rows):
    y = 66 + i * 55; d.box(20, y, 190, 46, a, fs=17, fill=Y if i in (0, 6) else K, bold=True); d.box(230, y, 550, 46, fill="#fff"); d.text(246, y + 29, b, 16, "start")
d.save("zu-mujinan.svg")

# 16 聞き返す or 仮定
d = D(800, 415, "聞き返すか、仮定で進めるか", "情報が足りないときの判断の図。答えを左右する情報が足りなければ、聞き返しが簡単で安いなら聞く、そうでなければ仮定を書いて進める。")
d.box(300, 52, 200, 40, "依頼を受ける", fs=18, fill=K)
d.arrow(400, 98, 400, 117); d.diamond(400, 172, 175, 55, ["答えを大きく左右する", "情報が足りない?"], 16)
d.arrow(225, 172, 192, 172); d.text(208, 160, "いいえ", 14, fill=B, bold=True); d.box(20, 148, 170, 48, "そのまま回答", fs=17)
d.arrow(400, 228, 400, 258); d.text(425, 248, "はい", 14, "start", R, True)
d.diamond(400, 313, 175, 55, ["聞き返すのは", "簡単で、安い?"], 16)
d.arrow(225, 313, 192, 313); d.text(208, 301, "はい", 14, fill=B, bold=True); d.box(20, 289, 170, 48, "聞き返す", fs=17, fill=Y)
d.arrow(575, 313, 608, 313); d.text(592, 301, "いいえ", 14, fill=R, bold=True); d.box(610, 289, 170, 48, "仮定を書いて進める", fs=15, fill=Y)
d.text(400, 398, "仮定で進めるときは、置いた仮定を回答の冒頭に書く", 16, fill=R, bold=True); d.save("zu-kikikaeshi.svg")
# 17 夕飯を条件で絞る
d = D(800, 370, "夕飯は「条件」で絞る", "夕飯の決め方の図。無数の候補を、冷蔵庫にあるもの、かけられる時間、今の気分の3つの条件で絞り、1品に決める。")
for i, (w, t, f) in enumerate([(700, "夕飯の候補(数えきれない)", "#fff"), (540, "①冷蔵庫にあるもので絞る → 約10品", K), (380, "②かけられる時間で絞る → 約4品", K), (240, "③今の気分で1品に", Y)]):
    d.box(400 - w // 2, 66 + i * 68, w, 56, t, fs=17, fill=f, bold=(i == 3))
for i in range(3): d.arrow(400, 124 + i * 68, 400, 132 + i * 68)
d.text(400, 352, "選ぶより先に「外す」。条件が絞ってくれる", 17, fill=R, bold=True); d.save("zu-kondate.svg")

# 18 電気代ロジックツリー
d = D(800, 375, "電気代が上がった理由を、ツリーで探す", "ロジックツリーの図。電気代は8,000円から10,400円に30%増。使用量が250から330キロワット時に32%増えたのが原因で、単価と基本料金は変わらない。")
d.box(20, 150, 190, 84, ["電気代", "8,000→10,400円", "(+30%)"], fs=16, fill=K)
d.box(265, 76, 215, 84, ["使用量", "250→330kWh", "(+32%)"], fs=16, fill=Y); d.box(265, 244, 215, 84, ["単価・基本料金", "30円/kWh・500円", "(変化なし)"], fs=15)
d.arrow(212, 180, 263, 126); d.arrow(212, 205, 263, 274)
for i, t in enumerate(["エアコンを使う日が増えた?", "家にいる時間が増えた?", "家電が増えた?"]):
    y = 36 + i * 72; d.box(545, y, 235, 56, t, fs=15, fill="#fff"); d.arrow(482, 118, 543, y + 28)
d.text(662, 262, "▲ 次に確かめる仮説", 17, fill=R, bold=True)
d.text(400, 360, "先に「どこが増えたか」を数字で特定。原因の想像は、そのあと", 16, fill=R, bold=True); d.save("zu-denkidai.svg")

# 19 引っ越し先を判断軸と重みで比べる
d = D(800, 385, "判断軸 × 重み で、部屋を比べる", "引っ越し先の比較表。家賃、通勤、広さ、駅からの距離を重みつきで採点し、部屋Aが36点、Bが29点、Cが33点でAが1位。広さの重みを4にするとCが43点で1位になる。")
cols = [(20, 110, "部屋"), (130, 120, ["家賃", "重み3"]), (250, 120, ["通勤", "重み3"]), (370, 120, ["広さ", "重み2"]), (490, 120, ["駅から", "重み1"]), (610, 160, "合計")]
for x, w, t in cols: d.box(x, 64, w, 56, t, fs=16, fill=K, shadow=False)
for i, (n, sc, tot) in enumerate([("部屋A", [4, 5, 2, 5], 36), ("部屋B", [3, 3, 4, 3], 29), ("部屋C", [5, 2, 5, 2], 33)]):
    y = 124 + i * 54; d.box(20, y, 110, 50, n, fs=17, fill=K, bold=True, shadow=False)
    for j, v in enumerate(sc): d.box(130 + j * 120, y, 120, 50, f"{v}点", fs=18, shadow=False)
    d.box(610, y, 160, 50, f"{tot}点", fs=20, fill=Y if i == 0 else "#fff", bold=True, shadow=False)
d.text(400, 318, "点数(5点満点)× 重み の合計で比べる", 16)
d.text(400, 352, "広さの重みを4にすると、C(43点)が1位に変わる。決め手は「何を大事にするか」", 16, fill=R, bold=True); d.save("zu-hikkoshi.svg")
print("ok")

# 20 読書ノート
d = D(800, 350, "読書ノート:1冊を「3行と1つの問い」で残す", "読書ノートの図。読み終わって5分以内に、一言でいうと、使えそうな一文、明日やること、残った問いの4つを書き、1週間後に見返す。")
d.box(30, 70, 440, 250, fill="#fff")
d.add(f'<line x1="44" y1="78" x2="44" y2="312" stroke="{R}" stroke-width="2"/>')
for i, (a, b) in enumerate([("①一言でいうと", "自分の言葉で、1行"), ("②使えそうな一文", "引用でなく、言い直す"), ("③明日やること", "具体的な行動を1つ"), ("④残った問い", "まだ分からないこと")]):
    y = 112 + i * 52; d.text(60, y, a, 18, "start", bold=True); d.text(60, y + 22, b, 14, "start", GR); d.line(58, y + 30, 456, y + 30)
d.box(520, 80, 250, 56, ["読み終わって", "5分以内に書く"], fs=17, fill=Y); d.arrow(645, 138, 645, 176)
d.box(520, 180, 250, 56, ["1週間後に", "見返す"], fs=17); d.arrow(645, 238, 645, 270)
d.box(520, 274, 250, 46, "③を実行したか確認", fs=16, fill=K)
d.save("zu-dokusho-note.svg")

# 21 ノート選び
d = D(800, 310, "最初のノートは「5つの基準」で選ぶ", "ノート選びの図。サイズ、罫線、紙の書き心地、開きやすさ、価格の5つの基準を、重みをつけて比べる。")
d.box(300, 62, 200, 46, "最初の1冊", fs=20, fill=Y, bold=True)
for i, (a, q) in enumerate([("サイズ", ["持ち歩く?", "机で使う?"]), ("罫線", ["文字中心?", "図も描く?"]), ("紙", ["ペンに", "合う?"]), ("開きやすさ", ["片手で", "書ける?"]), ("価格", ["気軽に", "使い切れる?"])]):
    x = 20 + i * 155; d.arrow(400, 110, x + 65, 148); d.box(x, 150, 130, 40, a, fs=17, fill=K, bold=True); d.box(x, 196, 130, 66, q, fs=15)
d.text(400, 296, "迷ったら、基準に重みをつけて点数で比べる", 16, fill=R, bold=True); d.save("zu-note-erabi.svg")
