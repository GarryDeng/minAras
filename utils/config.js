var config = {
  baseHref: 'https://t.xzlii.com/',
  apiList: {
    indexBanner: 'api.php?op=wechat_index&act=banner', //首页轮播图
    indexExpert: 'api.php?op=wechat_index&act=expert_rec', //推荐专家
    indexProgramme: 'api.php?op=wechat_index&act=programme',//解决方案（设计图上是产品分类)
    indexHome: 'api.php?op=wechat_index&act=news',//筑享慧万家
    thinkTankBanner: 'api.php?op=wechat_thinktank&act=banner',//智库轮播
    thinkTankDescription: 'api.php?op=wechat_thinktank&act=description',//智库简介
    thinkTankExperts: 'api.php?op=wechat_thinktank&act=experts',//专家团队
    thinkTankViewpoint: 'api.php?op=wechat_thinktank&act=viewpoint',//专家观点
    thinkTankCategory: 'api.php?op=wechat_thinktank&act=category',//专家分类
    thinkTankSkilled: 'api.php?op=wechat_thinktank&act=scfx',//专家擅长方向
    thinkTankExpertList: 'api.php?op=wechat_thinktank&act=expert_list',//专家列表
    thinkTankViewpointList: 'api.php?op=wechat_thinktank&act=viewpoint_list',//观点列表
    thinkTankExpertInfo: 'api.php?op=wechat_thinktank&act=expert_info',//专家详情
    thinkTankViewpointInfo: 'api.php?op=wechat_thinktank&act=viewpoint_info',//观点详情
    schemeBanner: 'api.php?op=wechat_programme&act=init',//解决方案
    schemeBannerId: 'api.php?op=wechat_programme&a=programme_info&id=方案id',//解决方案详情
    schemewindowId: 'api.php?op=wechat_programme&a=sys&id=方案id',//系统构成
    schemewindowDetailsId: 'api.php?op=wechat_programme&a=sys_info&id=系统id',//系统构成详情
    builtListNav: 'api.php?op=wechat_news&act=category',//资讯分类标题
    builtList: 'api.php?op=wechat_news&act=list',//资讯分类页数与分类
    builtDetails: 'api.php?op=wechat_news&act=new_info',//资讯详情
  }
}

module.exports = {
  config: config
}