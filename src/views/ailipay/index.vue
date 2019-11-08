<template>
   <div class="analysis" >
     <div>
       <div :style="{backgroundImage:'url('+nameUrl+')'}"></div>
       <p>{{name}}</p>
     </div>
     <div class="analysiskey" >
       <div>
         <div>
           <div>Day</div>
           <div>{{this.dayNumber}}</div>
         </div>
         <div>{{this.theme}}</div>
       </div>
     </div>
     <div class="Keyinterpretation" >
        <div>重点句子</div>
        <div>
          <ul>
            <li  v-for="(item,index) in list" :key="index" class="all">
              <div  >
                  <div class="textSpan" v-for="(items,indexs) in item.texys" :key="indexs"  v-html="items " ></div>
              </div>
              <div  v-if="item.userAudioUrl?item.userAudioUrl:''"  class="allstart" >
                <p :class="[item.score>= 0  ? 'starts' : 'start']"></p>
                <p :class="[item.score>1.5 ? 'starts' : 'start']"></p>
                <p :class="[item.score>2.5 ? 'starts' : 'start']"></p>
                <p :class="[item.score>3.5 ? 'starts' : 'start']"></p>
                <p :class="[item.score>4.5? 'starts' : 'start']"></p>
              </div>
              <div  class="player" @click="player" v-if="item.userAudioUrl?item.userAudioUrl:''" ><m-audio :src="item.userAudioUrl?item.userAudioUrl:''" ></m-audio></div>
              <div class="borderbottom"></div>
            </li>
          </ul>
        </div>
     </div>
   </div>
</template>
<script>
  
    import "./index.css"
    import Maudio from '../../lib/audio.vue'
    import { ServerIP, H5IP, isWeiXin, GetQueryString } from '../../common/common';
    export default {
      name: "Ailipay",
      data(){
        return{
          audios:"",
         src:'http://1252014125.vod2.myqcloud.com/46740e39vodcq1252014125/1db79a9a5285890783173288539/ZOaFuTmGs30A.mp3',
         name:"",
         nameUrl:"",
         list:"",
         Allstar:"",
         Halfstar:"",
         starts:"../../static/无星@2x.png",
         dayNumber:"",
         AllList:[],
         theme:"",
        }
      },
     components:{
       Maudio
     },
      mounted(){
                  let data = new FormData();
                  
                  data.append('campClassId',GetQueryString("campClassId"));
                  data.append('userId',GetQueryString("userId"));
                   fetch(ServerIP+"v2/curriculums/testAnalysis",{
                     method:"post",
                     body:data,
                     mode:"cors",
                     headers:{
                      }
                   }).then(()=>{
                    return res.json();
                   })
                   .then((res)=>{
                      this.name=res.data.user.nickname;
                      this.nameUrl=res.data.user.avatar;
                      this.list=res.data.quizSentencesResult;
                      this.dayNumber=res.data.campClass.ranking;
                      if(this.dayNumber<10){
                        this.dayNumber="0"+this.dayNumber
                      }
                      this.theme=res.data.campClass.theme;
                      for(let key in this.list){
                         let textList=this.list[key].text.split(" ")
                         this.list[key].texys=textList;
                
                         if(this.list[key].badWordsIndex){
                            let badWordsList=this.list[key].badWordsIndex.split(",")
                            this.list[key].badWordsList=badWordsList;
                         }
                           if(this.list[key].goodWordsIndex){
                            let goodWordsList = this.list[key].goodWordsIndex.split(",")
                            this.list[key].goodWordsList=goodWordsList
                         }
                         for(let keys in this.list[key].texys){
                          if(this.list[key].texys[keys]==""){
                            // this.list[key].texys.splice(keys,1)
                          }
                          this.keys=keys
                          let span = document.createElement("span")
                          span.innerHTML=this.list[key].texys[keys]
                          this.list[key].texys[keys]=span
                        }
                          for( let goodIndex in  this.list[key].goodWordsList ){
                              this.list[key].texys[this.list[key].goodWordsList[goodIndex]-1].className="good"
                          }
                          for(let badIndex in this.list[key].badWordsList ){
                           
                            if(this.list[key].badWordsList[badIndex]-1>this.keys){
                            }else if(this.list[key].score==0){
                                    this.list[key].texys[this.list[key].badWordsList[badIndex]-1].className="bad"
                            }else{
                               this.list[key].texys[this.list[key].badWordsList[badIndex]-1].className="bad"
                            }
                          }
                            for(let keya in this.list[key].texys){
                              this.list[key].texys[keya]=this.list[key].texys[keya].outerHTML
                            }
                       }
                   })
               }
          }
</script>



