   <template>
        <div class="PaymentMain">
              <div class="selectText" >选择支付方式</div>
              <div class="weixinPay" @click="weixinpay">
                <div>
                  <p></p>
                  <p>微信支付</p>
                </div>

                <div :class="[weipayFlag ? 'weixinSelectT' : 'weixinSelect']"></div>
              </div>
              <div class="zhifuPay" @click="zhifupay" v-if="showFlag">
                <div>
                  <p></p>
                  <p>支付宝支付</p>
                </div>
                <div :class="[zhifupayFlag ? 'zhifubaoSelectT' : 'zhifubaoSelect']"></div>
              </div>
              <div class="paybottom" >
                <div>实付款：</div>
                <div>￥398元</div>
                <div @click="selectPay" >立即购买</div>
              </div>
        </div>
    </template>
    <script>
        import "./index.css"
        export default {
          data() {
            return {
              collapsed: false,
              platform:"",
              showFlag:true,
              zhifupayFlag:false,
              weipayFlag:true,
              ProType:"",
              OriginalType:"",
              IELTSType:"",
              number:"",
            }
          },
          mounted(){
        
            if(localStorage.getItem("ProType")==""){
                
            }else{
              this.ProType = localStorage.getItem("ProType");
            };
            if(localStorage.getItem("OriginalType")==""){

            }else{
              this.OriginalType = localStorage.getItem("OriginalType");
            };
            if(localStorage.getItem("IELTSType")==""){

            }else{
              this.IELTSType = localStorage.getItem("IELTSType");
            };
            if(localStorage.getItem("number")==""){

            }else{
              this.number = localStorage.getItem("number");
            }
            console.log( this.ProType)
          },
          methods:{
            selectPay(){
              if(this.weipayFlag){
                  tenpay()
              }else if(this.zhifupayFlag){
                  ailipay()
              }else if(this.isWeiXin()){
                  jsapipay()
              }

            },
            jsapipay(){

            },
            weixinpay(){
                this.weipayFlag = true;
                this.zhifupayFlag = false;
            },
            zhifupay(){
                this.zhifupayFlag = true;
                this.weipayFlag = false;
            },

            ailipay(){
              let data = new FormData();
              
              var ProType = this.ProType;
              var OriginalType = this.OriginalType;
              var IELTSType = this.IELTSType;
              var number = this.number;
              let obj = {}
              obj[ProType]=1;
              obj[OriginalType]=1;
              obj[IELTSType]=number;
              data.append('payType',31);
              data.append('type',0);
              var goodsGroupInfo = JSON.stringify(obj)
              data.append("goodsGroupInfo",goodsGroupInfo);
              let redirecturi = "http://" + window.location.host+"/spell";
              data.append("returnUrl",redirecturi)
              fetch("http://jztest.jinghangapps.com:5432/v2/aliH5Helper/h5Pay",{
                method:"post",
                body:data,
                mode:"cors",
                headers:{
                    "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjE1ODU2ODk1Njg5IiwiaWQiOjk0NSwiaWF0IjoxNTczMTEwNzUyLCJleHAiOjE1NzU3MDI3NTJ9.wQSWevNRcH_u-AEwB1FGgWngXklJbtzzUPPlHgeekqc",
                 }            
              }).then((res)=>{
                return res.json()
              }).then((res)=>{
                location.href=res.data.url;
              })
            },
            tenpay(){
              let data = new FormData();
              var obj = {}
              var ProType = this.ProType;
              var OriginalType = this.OriginalType;
              var IELTSType = this.IELTSType;
              var number = this.number;
              obj[ProType]=1;
              obj[OriginalType]=1;
              obj[IELTSType]=number;
              data.append('payType',31);
              data.append('type',0);
              var goodsGroupInfo = JSON.stringify(obj)
              data.append("goodsGroupInfo",goodsGroupInfo);
              fetch("http://jztest.jinghangapps.com:5432/v2/wxH5Helper/h5Pay",{
                method:"post",
                body:data,
                mode:"cors",
                headers:{
                    "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjE1ODU2ODk1Njg5IiwiaWQiOjk0NSwiaWF0IjoxNTczMTEwNzUyLCJleHAiOjE1NzU3MDI3NTJ9.wQSWevNRcH_u-AEwB1FGgWngXklJbtzzUPPlHgeekqc",
                 }            
              }).then((res)=>{
                return res.json()
              }).then((res)=>{
                  console.log(res)
                  var url = "http://" + window.location.host+"/spell";
                  url = encodeURIComponent(url);
                  location.href=res.data.mweb_url + "&redirect_url=" + url;

              })
            },
            isWeiXin() {
                //判断是否微信平台
                let ua = window.navigator.userAgent.toLowerCase();
                return ua.match(/MicroMessenger/i) == "micromessenger";
            },
          },

        }
          
          
        
    </script>
