<template lang="pug">
    div
        EnterpriseAuth(v-if="type==2")
        PersonalAuth(v-else-if="type==1")
</template>
<script src="./CustomerReAuth.controller"></script>