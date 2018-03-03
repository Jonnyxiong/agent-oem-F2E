<template lang="pug">
    div 
       AgentAuth(v-if="submit != 1")
       AuthAlready(v-else)
</template>
<script src="./Auth.controller.js"></script>
