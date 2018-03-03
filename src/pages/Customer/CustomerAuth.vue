<template lang="pug">
    div 
        AuthAlready(v-if="customer_cer.clientId != ''")
        EnterpriseAuth(v-else-if="type == 2 && customer_cer.clientId == ''")
        PersonalAuth(v-else-if="type == 1 && customer_cer.clientId == ''")
        
</template>
<script src="./CustomerAuth.controller.js"></script>
<style lang="scss">

</style>