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
            <div @click="handlerclick">点击复制微信号</div>
            <textarea cols="20" rows="10" id="biao1">18611575192</textarea>
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

            },
              copy (id, attr){ 
                  
                    let target = null;
                    
                    if (attr) {
                      target = document.createElement("div");
                      target.id = "tempTarget";
                      target.style.opacity = "0";
                      if (id) {
                      let curNode = document.querySelector("#" + id);
                      target.innerText = curNode[attr];
                      } else {
                      target.innerText = attr;
                      }
                      document.body.appendChild(target);
                    } else {
                      target = document.querySelector("#" + id);
                    }
                    
                    try {
                    let range = document.createRange();
                    range.selectNode(target);
                    console.log(range)

                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                    document.execCommand("copy");
                    window.getSelection().removeAllRanges();
                    console.log("复制成功")
                    } catch (e) {
                    console.log("复制失败")
                    }
                    if (attr) {
                    // remove temp target
                    target.parentElement.removeChild(target);
                    }
                    }
          },

        }
          
          
        
    </script>