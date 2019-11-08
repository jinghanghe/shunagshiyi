    <template>
        <div class="spellMain" >
            <div class="language">
              <div class="languageImg"></div>
              <div class="languageText">
                <div>鲸小爱口语课</div>
                <div>
                  <span>天数</span>
                  <select id="0" v-model="ZERO" ref="selectDom" @change="handlerSelect($event)" >
                    <option value="0">0</option>
                    <option value="30">{{monthly}}</option>
                    <option value="180">{{halfAYear}}</option>
                    <option value="360">{{year}}</option>
                  </select>
                </div>
                <div>
                  <span>小计：</span>
                  <s>￥{{OriginalPrice}}</s>
                  <span>￥{{PresentPrice}}</span>
                </div>
                <div>
                  <span>{{averagePerDay}}</span>
                </div>
              </div>
            </div>

          <div class="ProFormaPlan">
              <div class="ProFormaPlanImg"></div>
              <div class="ProFormaPlanText">
                <div>雅思备考计划</div>
                <div>
                  <span>天数</span>
                  <select id="0" v-model="Zero" ref="selectDom" @change="handlerSelectPro($event)" >
                    <option value="0">0</option>
                    <option value="7">{{Proseven}}</option>
                    <option value="14">{{ProFourteen}}</option>                   
                    <option value="30">{{Promonthly}}</option>
                    <option value="60">{{ProhalfAYear}}</option>
                    <option value="90">{{Proyear}}</option>
                  </select>
                </div>
                <div>
                  <span>小计：</span>
                  <s>￥{{ProOriginalPrice}}</s>
                  <span>￥{{ProPresentPrice}}</span>
                </div>
                <div>
                  <span>{{ProaveragePerDay}}</span>
                </div>
              </div>
            </div>

            <div class="IELTSodeTest">
              <div class="IELTSodeTestImg"></div>
              <div class="IELTSodeTestText">
                <div>雅思模考</div>
                <div>
                  <span>个数</span>
                  <div class="taximeter">
                    <div @click="subtraction" >-</div>
                    <div>{{number}}</div>
                    <div @click="add" >+</div>
                  </div>
                </div>
                <div>
                  <span>小计：</span>
                  <s>￥{{IELTSOriginalPrice}}</s>
                  <span>￥{{IELTSPresentPrice}}</span>
                </div>
                <div>
                </div>
              </div>
            </div>

            <div class="spellBottom">
              <div>
                <s>￥{{TotalPrice}}</s>
                <p>
                  现价:￥
                  <span>{{Discount}}</span>
                </p>
              </div>
              <div @click="pay">去结算</div>
            </div>

            <div class="LoginPhoneTosts" v-show="this.phoneInfoFlag">
                  请选择商品支付
            </div>
        </div>
    </template>
    <script>
        import "./index.css"
        import { ServerIP, H5IP, isWeiXin, GetQueryString } from "../../common/common";
        export default {
          data() {
            return {
              collapsed: false,
              platform:"",
              Days:"",
              ZERO:0,
              Zero:0,
              ProOriginalPrice:0, //备考计划原价
              ProPresentPrice:0, //备考计划现价
              OriginalPrice:0, //原价
              PresentPrice:0, // 现价
              monthly:30, //月度
              halfAYear:180, //半年
              year:360, //年度
              Promonthly:30,
              ProSelectVal:30,
              averagePerDay:"(￥0天)",
              ProaveragePerDay:"(￥0天)",
              OralEnglishClass:{
              },
              SelectVal:30,
              Proseven:7,
              ProFourteen:14,
              Promonthly:30,
              ProhalfAYear:60,
              Proyear:90,
              TotalPrice:0, //总价
              Discount:0, //打折
              number:0,
              IELTSOriginalPrice:0,//雅思原价
              IELTSPresentPrice:0,//雅思现价
              IELTSaveragePerDay:"(￥0天)",//雅思日价
              ProType:"",//雅思备考计划
              IELTSType:"", //雅思模考
              OriginalType:"",//口语课
              UnitPrice:"",//单价
              shoppay:"",
              phoneInfoFlag:false,
              
            }
          },
          mounted(){
            localStorage.removeItem("orderNo")
            fetch(ServerIP+"v2/singlesDay/showGoodsPageInfo")
            .then((res)=>{
              return res.json()
            })
            .then((res)=>{
              console.log(res);
              this.OralEnglishClass=res.data.goodsArr;
              console.log(this.OralEnglishClass);
              this.shoppay = res.data.goodsGroup.payType
            })
          },
          methods:{
            handlerSelect(event){
              if(event.target.value==30){
                this.OriginalPrice=this.OralEnglishClass[0].originPrice  / 100 ;
                this.PresentPrice=this.OralEnglishClass[0].currentPrice / 100;
                this.averagePerDay="(￥"+( this.OralEnglishClass[0].currentPrice /100 / 30 ).toFixed(1) +"天)";
                this.OriginalType = this.OralEnglishClass[0].payType
              }else if(event.target.value==180){
                this.OriginalPrice=this.OralEnglishClass[1].originPrice /100 ;
                this.PresentPrice=this.OralEnglishClass[1].currentPrice /100;
                this.averagePerDay="(￥"+(this.OralEnglishClass[1].currentPrice /100 / 180).toFixed(1)+"天)";
                this.OriginalType = this.OralEnglishClass[1].payType
              }else if(event.target.value==360){
                this.OriginalPrice=this.OralEnglishClass[2].originPrice /100;
                this.PresentPrice=this.OralEnglishClass[2].currentPrice /100;
                this.averagePerDay="(￥"+ (this.OralEnglishClass[2].currentPrice/ 100 / 360).toFixed(1)+"天)";
                this.OriginalType = this.OralEnglishClass[2].payType
              }else if(event.target.value==0){
                this.OriginalPrice=0;
                this.PresentPrice=0;
                this.averagePerDay="(￥0天)";
              }
              this.TotalPrice=this.OriginalPrice  + this.ProOriginalPrice +this.IELTSOriginalPrice ;
              this.Discount=this.PresentPrice  + this.ProPresentPrice  +this.IELTSPresentPrice ;
            },
            handlerSelectPro(event){
              if(event.target.value==30){
                this.ProOriginalPrice=this.OralEnglishClass[6].originPrice /100 ;
                this.ProPresentPrice=this.OralEnglishClass[6].currentPrice /100;
                this.ProaveragePerDay="(￥"+(this.OralEnglishClass[6].currentPrice /100 / 30).toFixed(1)+"天)";
                this.ProType = this.OralEnglishClass[6].payType;
              }else if(event.target.value==60){
                this.ProOriginalPrice=this.OralEnglishClass[7].originPrice /100 ;
                this.ProPresentPrice=this.OralEnglishClass[7].currentPrice /100;
                this.ProaveragePerDay="(￥"+(this.OralEnglishClass[7].currentPrice / 100 / 60).toFixed(1)+"天)";
                this.ProType = this.OralEnglishClass[7].payType;
              }else if(event.target.value==90){
                this.ProOriginalPrice=this.OralEnglishClass[8].originPrice /100;
                this.ProPresentPrice=this.OralEnglishClass[8].currentPrice /100;
                this.ProaveragePerDay="(￥"+(this.OralEnglishClass[8].currentPrice/ 100 / 90).toFixed(1)+"天)";
                this.ProType = this.OralEnglishClass[8].payType;
              }else if(event.target.value==7){
                this.ProOriginalPrice=this.OralEnglishClass[4].originPrice /100;
                this.ProPresentPrice=this.OralEnglishClass[4].currentPrice /100;
                this.ProaveragePerDay="(￥"+(this.OralEnglishClass[4].currentPrice/100 / 7).toFixed(1)+"天)";
                this.ProType = this.OralEnglishClass[4].payType;
              }else if(event.target.value==14){
                this.ProOriginalPrice=this.OralEnglishClass[5].originPrice /100;
                this.ProPresentPrice=this.OralEnglishClass[5].currentPrice /100;
                this.ProaveragePerDay="(￥"+(this.OralEnglishClass[5].currentPrice / 100/ 14).toFixed(1)+"天)";
                this.ProType = this.OralEnglishClass[5].payType;
              }else if(event.target.value==0){
                this.ProOriginalPrice=0;
                this.ProPresentPrice=0;
                this.ProaveragePerDay="(￥0天)";
              }
              this.TotalPrice=this.OriginalPrice  + this.ProOriginalPrice  +this.IELTSOriginalPrice  ;
              this.Discount=this.PresentPrice  + this.ProPresentPrice  +this.IELTSPresentPrice  ;
            },
            subtraction(){
              this.number--
              if(this.number<0){
                this.number=0
              }
              this.IELTSOriginalPrice=this.OralEnglishClass[3].originPrice /100  * this.number;
              this.IELTSPresentPrice=this.OralEnglishClass[3].currentPrice /100 * this.number;
              this.IELTSaveragePerDay="(￥"+this.OralEnglishClass[3].currentPrice / 100 * this.number / 10+"天)";
              this.TotalPrice=this.OriginalPrice  + this.ProOriginalPrice  + this.IELTSOriginalPrice ;
              this.Discount=this.PresentPrice  + this.ProPresentPrice  + this.IELTSPresentPrice  ;
              this.IELTSType=this.OralEnglishClass[3].payType;
              this.UnitPrice = this.OralEnglishClass[3].currentPrice;
            },
            add(){
              this.number++;
              this.IELTSOriginalPrice=this.OralEnglishClass[3].originPrice / 100 * this.number;
              this.IELTSPresentPrice=this.OralEnglishClass[3].currentPrice  / 100* this.number;
              this.IELTSaveragePerDay="(￥"+this.OralEnglishClass[3].currentPrice /100  * this.number / 10+"天)";
              this.TotalPrice=this.OriginalPrice  + this.ProOriginalPrice  +this.IELTSOriginalPrice  ;
              this.Discount=this.PresentPrice   +  this.ProPresentPrice   + this.IELTSPresentPrice  ;
              this.IELTSType = this.OralEnglishClass[3].payType;
              this.IELTSType=this.OralEnglishClass[3].payType;
              this.UnitPrice = this.OralEnglishClass[3].currentPrice;
            },
            pay(){
              if(this.PresentPrice==0&&this.ProPresentPrice==0&&this.IELTSPresentPrice==0){
                 this.phoneInfoFlag=true
                 setTimeout(() => {
                 this.phoneInfoFlag = false;
                  }, 2000);
              }else{
                localStorage.setItem("ProType",this.ProType)
                localStorage.setItem("OriginalType",this.OriginalType)
                localStorage.setItem("IELTSType",this.IELTSType)
                localStorage.setItem("number",this.number)
                localStorage.setItem("Proprice",this.ProPresentPrice)
                localStorage.setItem("Oriprice",this.PresentPrice)
                localStorage.setItem("IELTSprice",this.IELTSPresentPrice)
                localStorage.setItem("UnitPrice",this.UnitPrice)
                // this.$router.push("/payment")
                if(localStorage.getItem("token")) {
                  
                  if(isWeiXin()) {
                    let uurrll = encodeURIComponent(H5IP+"payment?paytype="+this.shoppay+"&Discount="+this.Discount);
                    location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx406146b030189d06&redirect_uri=" + uurrll + "&response_type=code&scope=snsapi_base&#wechat_redirect");
                  } else {
                    window.location.href = "/payment?paytype="+this.shoppay+"&Discount=" + this.Discount ;
                    // this.$router.push("/payment?31/" + this.TotalPrice)
                  }
                } else {
                  window.location.href = "/login?paytype="+this.shoppay+"&Discount=" + this.Discount ;
                  // this.$router.push("/login?31/"+ this.Discount)
                }
              } 
            }
          },
        }
          
          
        
    </script>