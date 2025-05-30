"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2 + _easycom_mp_html2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat + _easycom_mp_html)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const detail = common_vendor.ref({});
    const myTitle = common_vendor.ref("欢迎关注我 持续学习小程序相关知识......");
    const myContent = common_vendor.ref(
      '<div><div><div><p><img src="https://i.ejiaimg.cn/94/2025/04/29/681088f7cb60b.jpg" style="max-width:100%;" contenteditable="false"/></p><p>扫码关注我，你将获得很多东西</p></div></div></div>'
    );
    const getNoticeDetail = () => {
      api_apis.apiGetNoticeDetail({
        id: noticeId
      }).then((res) => {
        detail.value = res.data;
        common_vendor.index.__f__("log", "at pages/notice/detail.vue:50", res.data.content);
      });
    };
    let noticeId;
    common_vendor.onLoad((e) => {
      let {
        name
      } = e;
      noticeId = e.id;
      getNoticeDetail();
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: detail.value.select
      }, detail.value.select ? {
        b: common_vendor.p({
          inverted: true,
          text: "置顶",
          type: "error"
        })
      } : {}, {
        c: common_vendor.t(myTitle.value),
        d: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        e: common_vendor.p({
          content: myContent.value
        }),
        f: common_vendor.t(detail.value.view_count)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f737f11"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notice/detail.js.map
