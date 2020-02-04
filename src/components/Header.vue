<template>
  <div id="header">
    <img id="logo" src="@/assets/CMG_logo_2c_rgb_pos.png">
    <br /><br /><br />
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>
#header {
  font-family: Roboto, Verdana;
  margin-bottom: 3em;
}

#header .icon {
  height: 23px;
  display: inline-block;
  margin-bottom: -6px;
}

.hr {
  border-bottom: 1px solid #dbdbdb;
  margin: 3em 0;
}

#header p {
  font-size: 15px;
  color: #767676 !important;
}

#toolbar{
  position:sticky;
  top:1px;
}

#logo {
  height: 150px;
}
</style>