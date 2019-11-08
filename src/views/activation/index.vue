    <template>
        <div class="ActMain">
            <div class="kuang">
                <div></div>
            </div>
            <div>您已支付成功</div>
            <div>所购买权益已发放</div>
            <div>请使用此手机号登陆“鲸小爱英</div>
            <div>语”App使用。扫码添加客服微信</div>
            <div>(18611575192)，我们将赠送您一</div>
            <div>份“英语学习大礼包”。</div>
            <div>点击复制微信号</div>
        </div>
    </template>
    <script>
        import "./index.css"
        export default {
          data() {
            return {
              collapsed: false,
              platform:"",
            }
          },
          mounted(){
        
          },
          methods:{
            handlerclick(){
              this.$router.push("/")
            }
          },

        }
          
          
        
    </script>