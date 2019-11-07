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
                  <span>{{IELTSaveragePerDay}}</span>
                </div>
              </div>
            </div>

            <div class="spellBottom">
              <div>
                <s>{{TotalPrice}}</s>
                <p>
                  现价:￥
                  <span>{{Discount}}</span>
                </p>
              </div>
              <div @click="pay">去支付</div>
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

            }
          },
          mounted(){
            fetch("http://jztest.jinghangapps.com:5432/v2/singlesDay/showGoodsPageInfo")
            .then((res)=>{
              return res.json()
            })
            .then((res)=>{
              console.log(res);
              this.OralEnglishClass=res.data.goodsArr;
              console.log(this.OralEnglishClass);
            })
          },
          methods:{
            handlerSelect(event){
              if(event.target.value==30){
                this.OriginalPrice=this.OralEnglishClass[0].originPrice;
                this.PresentPrice=this.OralEnglishClass[0].currentPrice;
                this.averagePerDay="(￥"+this.OralEnglishClass[0].currentPrice / 10+"天)";
                this.OriginalType = this.OralEnglishClass[0].payType
              }else if(event.target.value==180){
                this.OriginalPrice=this.OralEnglishClass[1].originPrice;
                this.PresentPrice=this.OralEnglishClass[1].currentPrice;
                this.averagePerDay="(￥"+this.OralEnglishClass[1].currentPrice / 10+"天)";
                this.OriginalType = this.OralEnglishClass[1].payType
              }else if(event.target.value==360){
                this.OriginalPrice=this.OralEnglishClass[2].originPrice;
                this.PresentPrice=this.OralEnglishClass[2].currentPrice;
                this.averagePerDay="(￥"+this.OralEnglishClass[2].currentPrice / 10+"天)";
                this.OriginalType = this.OralEnglishClass[2].payType
              }else if(event.target.value==0){
                this.OriginalPrice=0;
                this.PresentPrice=0;
                this.averagePerDay="(￥0天)";
              }
              this.TotalPrice=this.OriginalPrice + this.ProOriginalPrice+this.IELTSOriginalPrice;
              this.Discount=this.PresentPrice + this.ProPresentPrice+this.IELTSPresentPrice;
            },
            handlerSelectPro(event){
              if(event.target.value==30){
                this.ProOriginalPrice=this.OralEnglishClass[6].originPrice;
                this.ProPresentPrice=this.OralEnglishClass[6].currentPrice;
                this.ProaveragePerDay="(￥"+this.OralEnglishClass[6].currentPrice / 10+"天)";
                this.ProType = this.OralEnglishClass[6].payType;
              }else if(event.target.value==60){
                this.ProOriginalPrice=this.OralEnglishClass[7].originPrice;
                this.ProPresentPrice=this.OralEnglishClass[7].currentPrice;
                this.ProaveragePerDay="(￥"+this.OralEnglishClass[7].currentPrice / 10+"天)";
                this.ProType = this.OralEnglishClass[7].payType;
              }else if(event.target.value==90){
                this.ProOriginalPrice=this.OralEnglishClass[8].originPrice;
                this.ProPresentPrice=this.OralEnglishClass[8].currentPrice;
                this.ProaveragePerDay="(￥"+this.OralEnglishClass[8].currentPrice / 10+"天)";
                this.ProType = this.OralEnglishClass[8].payType;
              }else if(event.target.value==7){
                this.ProOriginalPrice=this.OralEnglishClass[4].originPrice;
                this.ProPresentPrice=this.OralEnglishClass[4].currentPrice;
                this.ProaveragePerDay="(￥"+this.OralEnglishClass[4].currentPrice / 10+"天)";
                this.ProType = this.OralEnglishClass[4].payType;
              }else if(event.target.value==14){
                this.ProOriginalPrice=this.OralEnglishClass[5].originPrice;
                this.ProPresentPrice=this.OralEnglishClass[5].currentPrice;
                this.ProaveragePerDay="(￥"+this.OralEnglishClass[5].currentPrice / 10+"天)";
                this.ProType = this.OralEnglishClass[5].payType;
              }else if(event.target.value==0){
                this.ProOriginalPrice=0;
                this.ProPresentPrice=0;
                this.ProaveragePerDay="(￥0天)";
              }
              this.TotalPrice=this.OriginalPrice + this.ProOriginalPrice+this.IELTSOriginalPrice;
              this.Discount=this.PresentPrice + this.ProPresentPrice+this.IELTSPresentPrice;
            },
            subtraction(){
              this.number--
              if(this.number<0){
                this.number=0
              }
              this.IELTSOriginalPrice=this.OralEnglishClass[3].originPrice * this.number;
              this.IELTSPresentPrice=this.OralEnglishClass[3].currentPrice * this.number;
              this.IELTSaveragePerDay="(￥"+this.OralEnglishClass[3].currentPrice * this.number / 10+"天)";
              this.TotalPrice=this.OriginalPrice + this.ProOriginalPrice+this.IELTSOriginalPrice;
              this.Discount=this.PresentPrice + this.ProPresentPrice+this.IELTSPresentPrice;
              this.IELTSType=this.OralEnglishClass[3].payType;
            },
            add(){
              this.number++;
              this.IELTSOriginalPrice=this.OralEnglishClass[3].originPrice * this.number;
              this.IELTSPresentPrice=this.OralEnglishClass[3].currentPrice * this.number;
              this.IELTSaveragePerDay="(￥"+this.OralEnglishClass[3].currentPrice * this.number / 10+"天)";
              this.TotalPrice=this.OriginalPrice + this.ProOriginalPrice+this.IELTSOriginalPrice;
              this.Discount=this.PresentPrice + this.ProPresentPrice+this.IELTSPresentPrice;
              this.IELTSType = this.OralEnglishClass[3].payType;
              this.IELTSType=this.OralEnglishClass[3].payType;
            },
            pay(){

              // console.log(this.ProType)
              // console.log(this.OriginalType)
              // console.log(this.IELTSType)
              localStorage.setItem("ProType",this.ProType)
              localStorage.setItem("OriginalType",this.OriginalType)
              localStorage.setItem("IELTSType",this.IELTSType)
              localStorage.setItem("number",this.number)
              this.$router.push("/payment")
              // let data = new FormData();
              // var obj = {22:1,25:2,26:1}
              // data.append('payType',31);
              // data.append('type',0);
              // var goodsGroupInfo = JSON.stringify(obj)
              // data.append("goodsGroupInfo",goodsGroupInfo);
              // let redirecturi = "http://" + window.location.host+"/spell";
              // // data.append("returnUrl",redirecturi)
              // fetch("http://jztest.jinghangapps.com:5432/v2/wxH5Helper/h5Pay",{
              //   method:"post",
              //   body:data,
              //   mode:"cors",
              //   headers:{
              //       "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjE1ODU2ODk1Njg5IiwiaWQiOjk0NSwiaWF0IjoxNTczMTEwNzUyLCJleHAiOjE1NzU3MDI3NTJ9.wQSWevNRcH_u-AEwB1FGgWngXklJbtzzUPPlHgeekqc",
              //    }            
              // }).then((res)=>{
              //   return res.json()
              // }).then((res)=>{
              //     console.log(res)
              //     var url = "http://" + window.location.host+"/spell";
              //     url = encodeURIComponent(url);
              //     location.href=res.data.mweb_url + "&redirect_url=" + url;
              //   // location.href=res.data.url;
              // })
            }
          
          },

        }
          
          
        
    </script>