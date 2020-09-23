<template>
  <div id="privacy">
    <h2>プライバシーポリシー</h2>
    <hr>
    <div class="container">
      <p>ついふぁい（以下、「本サービス」）では、本サービスをご利用されるユーザーの個人情報の取扱について以下のとおり定め、
        個人情報の保護に努めてまいります。</p>

      <h3>1.個人情報の利用目的</h3>
        <p>運営者は、以下の利用目的のためにユーザーの個人情報を収集します。</p>
        <ol type="1">
          <li>本サービスを提供するため</li>
          <li>ログイン時における本人認証、その他本サービスの運営に必要な管理のため</li>
          <li>本サービスの利用規約に違反する行為への対応及び当該違反行為の防止のため</li>
          <li>本サービスに関する規約、ポリシー等の変更等をお客様に通知するため</li>
          <li>紛争、訴訟などへの対応のため</li>
          <li>本サービスに関するご案内、お客様からのお問い合わせ等への対応のため</li>
        </ol>
      <!-- <h3>2.広告の配信について</h3>
        <p>本サービスは第三者配信の広告サービス「Google Adsenseグーグルアドセンス」を利用しています。
          広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。
          Cookie（クッキー）を無効にする設定およびGoogleアドセンスに関する詳細は「 広告 – ポリシーと規約 – Google  」をご覧ください。
        </p> -->
      <h3>2.アクセス解析ツールについて</h3>
        <p>本サービスでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
          このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
          このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
          この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
          この規約に関して、詳しくは<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" rel="noopener" target="_blank">ここをクリック</a>してください。
        </p>

      <h3>3.個人情報の管理について</h3>
        <p>収集された個人情報は適切な管理の下で安全に蓄積・保管し、不正アクセス、紛失、 破壊、改竄、漏洩などの危険に対して適切に技術的、
          組織的な予防および対策を講じます。
          個人情報もしくは情報システムを取り扱う業務を外部に委託する場合には、
          委託先の厳正な管理監督の下で行います。
        </p>

      <h3>4.個人情報の開示・訂正・利用停止・消去・苦情について</h3>
        <p>当社は、本人が自己の個人情報について、開示・訂正・利用停止・消去などを求める権利を有していることを確認し、
          「個人情報取扱に関するお問い合わせ窓口」を設け、これらの要求や苦情に対して速やかに対処します。</p>

      <h3>5.個人情報に関するお問い合わせ、開示等の請求に関する窓口</h3>
        <p><a href="https://twitter.com/chomeko3o" rel="noopener" target="_blank">管理人TwitterのDM</a>よりご連絡ください。</p>
    </div>
    <router-link
      class="back"
      to=router.go(-1)
    >戻る
    </router-link>
  </div>
</template>

<style lang="sass" scoped>
  #privacy
    //background: #00A7FF
    max-width: 400px
    height: 100%
    padding: 10px
    margin: auto
    padding-top: 52px
    p
      font-size: 12px
    ol
      list-style-type: decimal
      padding-left: 30px
      font-size: 12px
    a
      color: #FFF
  h2
    text-align: center
  h3
    font-size: 16px
  .container
    padding: 10px
  .back
    display: flex
    justify-content: center
</style>