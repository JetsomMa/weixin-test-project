"use strict";
const common_vendor = require("../../common/vendor.js");
const WXMP_URL = "https://www.mashaojie.cn/weixin";
const _sfc_main = {
  data() {
    return {
      title: "功能测试项目",
      provider: "",
      code: ""
    };
  },
  methods: {
    async getProvider() {
      try {
        const getProviderResp = await common_vendor.index.getProvider({ service: "oauth" });
        this.provider = getProviderResp.provider[0];
        return this.provider;
      } catch (e) {
        console.error(e);
      }
    },
    async getCode() {
      try {
        const provider = await this.getProvider();
        const loginRes = await common_vendor.index.login({ provider });
        if (loginRes.errMsg === "login:ok") {
          this.code = loginRes.code;
          console.log(this.code);
          return this.code;
        } else {
          console.error(loginRes);
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getOpenId() {
      try {
        await this.getCode();
        const resp = await common_vendor.index.request({
          url: WXMP_URL + "/wxmpApi/getOpenidAndToken",
          method: "POST",
          data: {
            code: this.code
          }
        });
        console.log(resp);
      } catch (e) {
        console.error(e);
      }
    },
    async getAccessToken() {
      try {
        const resp = await common_vendor.index.request({
          url: WXMP_URL + "/wxmpApi/getAccessToken",
          method: "GET"
        });
        console.log(resp);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.getCode && $options.getCode(...args)),
    b: common_vendor.o((...args) => $options.getOpenId && $options.getOpenId(...args)),
    c: common_vendor.o((...args) => $options.getAccessToken && $options.getAccessToken(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/jetsommax/Documents/HBuilderProjects/weixin-test-project/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
