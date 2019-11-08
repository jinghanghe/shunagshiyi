    <template>
        <div class="GoundMain" >
            <div class="HeadImgs" >
              <div class="HeadImgText">雅思口语机经训练营</div>
              <div class="HeadImgWords" >AI+真人纠音师共同帮你纠音</div>
              <div class="HeadStudy" >
                <div>最新口语机经</div>
                <div>专业名师纠错</div>
              </div>
              <div class="HeadInteraction">AI精准打分</div>
            </div>
            <div class="spellinglist" v-if="countFlag" >
                <div><span>{{this.curriculumAssemblies.length}}</span>人在拼单，可直接参与</div>
                <div class="swiper-container">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in this.curriculumAssemblies" :key="index"  >
                      <div :style="{backgroundImage:'url('+item.promoterUserAvatar+')'}" ></div>
                      <div>{{item.promoterUserNickname}}</div>
                      <div>
                        <p>还差<span class="difference">{{assemblySize-JSON.parse(item.memberUserIds).length}}</span>人拼成</p>

                        <p>剩余:{{testData[index]["djs"]}}</p>
                      </div>
                      <div @click="goSpellList(item.assemblyId)" >去拼单</div>
                    </div>
                </div >
                </div>
            </div>
            <div class="ash"></div>
            <div class="GroundSelectsM" >
                  为什么选择这个课程
            </div>
            <div class="GroundEnjoys">
              <p></p>
              <p>尊享服务</p>
              <p></p>
            </div>
            <div class="GroundProcess">
              <div class="GroundProcessO">
                <div class="GroundProcessOLeft" >
                  <div></div>
                  <p>提供
                    <span>“讲、</span>
                    <span>学、</span>
                    <span>练、</span>
                    <span>评”</span>
                   系统化机经学习方案
                  </p>
                </div>
                <div class="GroundProcessORight" >
                  <div></div>
                  <p><span>AI+真人纠音师</span>
                  共同帮助您纠正机经的回答
                  </p>
                </div>
              </div>
              <div class="GroundProcessT">
                <div class="GroundProcessTLeft" >
                  <div></div>
                  <p>
                    <span>由</span>
                    <span>浅</span>
                    <span>入</span>
                    <span>深</span>
                  详解机经解题思路，深度练习，积累语料
                  </p>
                </div>
                <div class="GroundProcessTRight" >
                  <div></div>
                  <p>精选高频
                    <span>“人、</span>
                    <span>事、</span>
                    <span>物、</span>
                    <span>地”</span>
                    机经话题，外教语音示范
                  </p>
                </div>
              </div>
            </div>
            <div class="GroundSelectsO" >
                <div>课程可以帮您解决什么问题？</div>
                <div>
                    <div>1</div>
                    <div>专业纠音老师帮您纠正机经答题语音语调</div>
                </div>
                <div>
                    <div>2</div>
                    <div>帮您解答机经的真正解题思路与套路</div>
                </div>
                <div>
                    <div>3</div>
                    <div>试用当季高频机经，强化答题技巧</div>
                </div>
            </div>
            <div class="GroundService" >
                  <div>课程服务人群</div>
                  <div class="GroundServiceEs" >
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
            </div>
            <div class="Coursecontent" >
                课程内容
            </div>
            <div class="CoursecontentText" >
                当季机经话题/详细视频讲解/真人题目解析
            </div>
            <div class="Img1" ></div>
            <div class="Img2" ></div>
            <div class="Img3" ></div>
            <div class="Classprocess">上课流程</div>
            <div class="ClassImg"></div>
            <div class="ashs" ></div>
            
            <div class="GroundDetailBottom" >
              <div class="GroundDetailBottomTime" >
                限购<span>{{this.limitedCount}}</span>人
              </div>
              <div class="GroundDetailBottomPersonal" @click="handlerpurchase()" >
                <p>￥<span>{{this.price}}元</span></p>
                <p>立即购买</p>
              </div>
              <div class="GroundDetailBottomSpell" @click="handlerClickPersonal()" >
                <p>￥<span>{{this.assemblePrice}}元</span></p>
                <p>发起拼团</p>
              </div>

            
            </div>
        </div>
    </template>
    <script>
        import "./index.css"
        import Swiper from "swiper"
        import 'swiper/css/swiper.css'
        import { swiper, swiperSlide } from 'vue-awesome-swiper'
        import { setInterval } from 'timers';
        import { ServerIP, H5IP, isWeiXin, GetQueryString } from '../../common/common';
           function timer(data) {
                let day,
                  hour,
                  minute,
                  second,
                  time = new Date(data).getTime()- new Date().getTime();
                if(time < 0) {
                  return;
                } else {
                  day = Math.floor(time/1000/60/60/24);
                  hour = Math.floor((time /1000/ 60 / 60) % 24);
                  minute = Math.floor((time /1000/ 60) % 60);
                  second = Math.floor((time/1000 ) % 60);
                  return str = day + "天" + hour + "时" + minute + "分" + second+"秒";
                }
            }
            let mySwiper = null;
        export default {
          data() {
            return {
              collapsed: false,
              assemblyId:"",//拼单ID,
              curriculumId:"2",//课程Id
              userId:"",
              limitedCount:"",//限购
              currentCount:"",//当前库存
              price:"",//价格
              assemblePrice:"",//拼团价格
              assemblySize:"",//拼团规模
              a:"",
              token:"",
              countDown:"",
              platform:"",
              changeTime:"",
              curriculumAssemblies:[ //正在有多少个人拼单
              ],
              list:[1,2,3],
              testData: [5,5,5,5],
              countFlag:true,
            }
          },

          watch:{
              curriculumAssemblies(){  //保证数据变了   保证dom准备好了
                    this.$nextTick(()=>{
                    mySwiper = new Swiper ('.swiper-container', {
                       loop: false, // 循环模式选项
                       direction: 'vertical', // 垂直切换选项
                       slidesPerView : 2, 
                       autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                      },
                    });
                  })
                this.testData = Object.assign({}, this.curriculumAssemblies);
                setInterval(()=> {
                  for (let key in this.testData) {
                      let startTime = new Date().getTime(),
                        endTime = new Date(Date.parse(this.testData[key]["willInvalidAt"].replace(/-/g, "/"))).getTime(),
                        rightTime = endTime - startTime;
                      if (rightTime > 0) {
                          let dd = Math.floor(rightTime / 1000 / 60 / 60 / 24),
                            hh = Math.floor((rightTime / 1000 / 60 / 60) % 24),
                            mm = Math.floor((rightTime / 1000 / 60) % 60),
                            ss = Math.floor((rightTime / 1000) % 60);
                          if(hh < 10) {
                            hh = "0" + hh;
                          }
                          if(mm < 10) {
                            mm = "0" + mm;
                          }
                          if(ss<10) {
                            ss = "0" + ss;
                          }
                          this.testData[key]["djs"] =  hh + ":" + mm + ":" + ss;
                      } else {
                          this.testData[key]["djs"] = "00:00:00";
                          this.changeTime=this.testData[key]["djs"];
                      }
                  }
                }, 1000);
              },
            },
          created() {
              if(GetQueryString("token")) {      //判断有没有token
                this.token = GetQueryString("token");
                localStorage.setItem("token", GetQueryString("token"));
              } else {
                this.token = "";
              }
              this.curriculumId = GetQueryString("curriculumId");
              localStorage.setItem("curriculumId",this.curriculumId);

              if(GetQueryString("platform")) {
                this.platform = GetQueryString("platform");
                localStorage.setItem("platform", GetQueryString("platform"));
              } else {
                  this.platform = "";
              }
              let params = {};
              if(localStorage.getItem("token")) {
                params.authorization = "Bearer "+localStorage.getItem("token");
              }
              fetch(ServerIP + "v2/curriculums/purchaseInfo/" + this.curriculumId, {
                  method: 'GET',
                  mode: "cors",
                  headers: params,
              }).then((res)=>{
                return res.json();
              }).then((res)=>{
                console.log(res)
                //0已购买 1拼团中 2拼团完成 -1未支付
                if(!res.data.buyState) {
                  if(!this.platform) {
                        window.location.href = H5IP + "spellsuccess?spell=2&assemblyId=" + res.data.assemblyId;
                  }else{
                      window.location.href = H5IP + "ground?assemblyId="+res.data.assemblyId;
                  }
                } else if(res.data.buyState == 1){
                  if(!this.platform) {
                    window.location.href = H5IP + "ground?spell=-1&assemblyId=" + res.data.assemblyId;
                  } else {
                    window.location.href = H5IP + "ground?assemblyId=" + res.data.assemblyId;
                  }
                } else if(res.data.buyState == 2) {
                  window.location.href = H5IP + "spellsuccess?spell=2&assemblyId=" + res.data.assemblyId;
                }
                this.limitedCount = res.data.limitedCount;
                this.assemblePrice = res.data.assemblePrice;
                this.assemblySize = res.data.assemblySize;
                this.price = res.data.price;    
                this.countDown = res.data.curriculumAssemblies;
                if(res.data.curriculumAssemblies <= 0) {
                  this.countFlag = false;
                }
                this.countDown.map((item,index) => {
                    this.$set(
                      item, "djs", timer(item.startTime)
                    )
                });
                this.curriculumAssemblies = this.countDown;
                this.testData = Object.assign({}, this.curriculumAssemblies);
                for (let key in this.testData) {
                  this.testData[key]["djs"] = "00:00:00";
                }
              });
          },

          methods:{
            checkTime(i) {
              return i < 10 ? "0" + i : i;
            },
            handlerClickPersonal(){
              if(localStorage.getItem("token")) {
                if(isWeiXin()) {
                    let uurrll = encodeURIComponent(H5IP + "payment?type=2&price=" + this.assemblePrice + "&curriculumId=" + this.curriculumId);
                    location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx406146b030189d06&redirect_uri=" + uurrll + "&response_type=code&scope=snsapi_base&#wechat_redirect");
                  } else {
                    window.location.href = H5IP + "payment?type=2&price=" + this.assemblePrice + "&curriculumId=" + this.curriculumId;
                  }
              } else {
                this.$router.push("/login?type=2&price=" + this.assemblePrice + "&curriculumId=" + this.curriculumId);
              }
            },

            goSpellList(assemblyId) {
              if(localStorage.getItem("token")) {
                if(isWeiXin()){
                  let uurrll = encodeURIComponent(H5IP + "payment?type=3&price=" + this.assemblePrice + "&curriculumId=" + this.curriculumId+"&assemblyId=" + assemblyId);
                  location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx406146b030189d06&redirect_uri=" + uurrll + "&response_type=code&scope=snsapi_base&#wechat_redirect");
                } else {
                  window.location.href = H5IP + "payment?type=3&price=" + this.assemblePrice + "&curriculumId=" + this.curriculumId + "&assemblyId=" + assemblyId;
                }
              } else {
                this.$router.push("/login?type=3&price=" + this.assemblePrice + "&curriculumId=" + this.curriculumId + "&assemblyId=" + assemblyId);
              }
            },

            handlerpurchase(){
              if(localStorage.getItem("token")) {
                if(isWeiXin()) {
                  let uurrll = encodeURIComponent(H5IP + "payment?type=1&price=" + this.price + "&curriculumId=" + this.curriculumId);
                  location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx406146b030189d06&redirect_uri=" + uurrll + "&response_type=code&scope=snsapi_base&#wechat_redirect");
                } else {
                  window.location.href = H5IP + "payment?type=1&price=" + this.price + "&curriculumId=" + this.curriculumId;
                }
              } else {
                this.$router.push("/login?type=1&price=" + this.price + "&curriculumId=" + this.curriculumId+"&assemblyId="+"")
              }
            },
          },
        }
    </script>