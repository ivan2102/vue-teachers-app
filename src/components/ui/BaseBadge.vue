<template>
 <span class="badge" :class="type">
     
 </span>
</template>

<script>
export default {
    
    props: ['type', 'title'],

    computed: {

        text() {

        return this.title.toUpperCase();
        }
    }

    
}
</script>

<style scoped>
.badge {

    background-color: #ccc;
    color: #252525;
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    display: inline-block;
    margin: 0.5rem;
}
.england {

 background-color:#00247d;background-image:linear-gradient(#cf142b 30px,transparent 30px),linear-gradient(90deg,#cf142b 30px,transparent 30px),linear-gradient(#fff 50px,transparent 50px),linear-gradient(90deg,#fff 50px,transparent 50px),linear-gradient(25deg,transparent 35px,#cf142b 35px,#cf142b 45px,transparent 45px),linear-gradient(25deg,transparent 30px,#fff 30px,#fff 55px,transparent 55px),linear-gradient(-25deg,transparent 45px,#cf142b 45px,#cf142b 55px,transparent 55px),linear-gradient(-25deg,transparent 35px,#fff 35px,#fff 60px,transparent 60px),linear-gradient(-25deg,transparent 45px,#cf142b 45px,#cf142b 55px,transparent 55px),linear-gradient(-25deg,transparent 40px,#fff 40px,#fff 65px,transparent 65px),linear-gradient(25deg,transparent 55px,#cf142b 55px,#cf142b 65px,transparent 65px),linear-gradient(25deg,transparent 45px,#fff 45px,#fff 70px,transparent 70px);background-size:300px 90px,165px 150px,300px 100px,175px 150px,125px 50px,125px 50px,125px 50px,125px 50px,125px 50px,125px 50px,125px 50px,125px 50px;background-position:0 -30px,-30px 0,0 -50px,-50px 0,0 0,0 0,175px 0,175px 0,0 100px,0 100px,175px 100px,175px 100px;background-repeat:repeat,repeat,repeat,repeat,no-repeat,no-repeat,no-repeat,no-repeat,no-repeat,no-repeat,no-repeat,no-repeat;width:80px;height:80px
  
}

.german {

   background-image:-webkit-linear-gradient(#000 33%,#d00 33%,#d00 66%,#ffce00 66%);background-image:-o-linear-gradient(#000 33%,#d00 33%,#d00 66%,#ffce00 66%);background-image:-moz-linear-gradient(#000 33%,#d00 33%,#d00 66%,#ffce00 66%);background-image:linear-gradient(#000 33%,#d00 33%,#d00 66%,#ffce00 66%);width:80px;height:80px

}

.france {

 background-image:-webkit-linear-gradient(90deg,#0055a4 33%,#fff 33%,#fff 66%,#ef4135 66%);background-image:-o-linear-gradient(90deg,#0055a4 33%,#fff 33%,#fff 66%,#ef4135 66%);background-image:-moz-linear-gradient(90deg,#0055a4 33%,#fff 33%,#fff 66%,#ef4135 66%);background-image:linear-gradient(90deg,#0055a4 33%,#fff 33%,#fff 66%,#ef4135 66%);width:80px;height:80px
}


</style>

