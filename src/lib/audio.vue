<template>
    <div class="x-audio-wrap" :class="{inline:!block}" ref="wrap" @click="play">
        <div class="x-sector" :class="{play:animate}">
            <div class="x-dot"></div>
        </div>
        <div class="x-time">{{duration&&showDuration?duration:text}}</div>
    </div>
</template>
<script>
export default {
    name:'m-audio',
    props:{
        src:{
            type:String,
            default:''
        },
        text:{
            type:String,
            default:"1"
        },
        showDuration:{
            type:Boolean,
            default:true
        },
        block:{
            type:Boolean,
            default:false
        },
    },
    data(){
        return{
            audio:null,
            animate:false,
            timer:null,
            duration:null,
            a:false
        }
    },
    mounted(){
        this.audio=new Audio()
        this.audio.src=this.src
        this.audio.addEventListener('canplaythrough',()=>{
            this.duration=this.format(this.audio.duration)
        })
        this.audio.onplay=()=>{
            this.animate=true
            this.timer=setInterval(() => {
                this.animate=false
                setTimeout(()=>{
                    this.animate=true
                },50)
            }, 1250);
        }
        this.audio.onpause=()=>{
            this.animate=false
            this.timer&&clearInterval( this.timer)
        }
        this.audio.onended=()=>{
            this.animate=false
            this.timer&&clearInterval( this.timer)
        }
        window.audioList.push(this.audio)//所有实例加入全局变量
    },
    methods:{
        play(){
            this.a=!this.a

            window.audioList.forEach(audio=>{//开始前先关闭所有可能正在运行的实例
                audio.pause()
            })
            
            if(this.a){
                this.audio.play()
                // this.audio.pause()
            }else{
                this.audio.pause()
            }
        },
        format(s){
            // var t='';
            // if(s > -1){
            //     var min = Math.floor(s/60) % 60;
            //     var sec = s % 60;

            //     if(min < 10){t += "0";}
            //     t += min + "'";
            //     if(sec < 10){t += "0";}
            //     t += sec.toFixed(2);
            // }
            // t=t.replace('.','\"')
            // return t;
        },
    }
}
</script>



