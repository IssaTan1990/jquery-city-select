/**
 *     _____ ____  __  ____  _______________    ______  __
 *    / ___// __ \/ / / / / /_  __/ ____/   |  / __ \ \/ /
 *    \__ \/ / / / / / / /   / / / __/ / /| | / /_/ /\  /
 *   ___/ / /_/ / /_/ / /___/ / / /___/ ___ |/ _, _/ / /
 *  /____/\____/\____/_____/_/ /_____/_/  |_/_/ |_| /_/
 *
 *  jQuery.City.Select.js
 *
 *  @author soulteary@qq.com
 */
/* global define */
define('city.select', [ 'jQuery' ], function ($) {
  'use strict';

  $.fn.extend({
    'citylist': function (params) {
      params = $.extend({
        id: 'id',         //数据的ID名称
        name: 'name',       //数据的VALUE名称
        children: 'children',   //数据子元素的KEY的名称
        metaTag: 'data-extra', //将数据元素的ID存放到HTML元素的标签中
        idVal: false,        //使用ID做OPTION的VALUE
        data: false,        //默认数据
        selected: false         //选中的元素eg: 14 / [14:1401]
      }, params);

      var target = $(this);
      var hasSelected = ' selected="selected"';

      function multipleBox (target, params) {
        var province = target.eq(0);
        var city = target.eq(1);
        var county = target.eq(2);

        var curProvince = 0;
        var curCity = 0;


        var html = [], oItem;
        html.push('<option value=""> -- 请选择 -- </option>');
        for (var item in params.data) {
          if (params.data.hasOwnProperty(item)) {
            oItem = params.data[ item ];
            if (params.idVal) {
              html.push('<option ' + params.metaTag + '="' + oItem[ params.id ] + '" value="' + oItem[ params.id ] + '"' + ((params.selected && (params.selected[ 0 ] == oItem[ params.id ])) ? hasSelected : '') + '>' + oItem[ params.name ] + '</option>');

            } else {
              html.push('<option ' + params.metaTag + '="' + oItem[ params.id ] + '" value="' + oItem[ params.name ] + '"' + ((params.selected && (params.selected[ 0 ] == oItem[ params.id ])) ? hasSelected : '') + '>' + oItem[ params.name ] + '</option>');

            }
          }
        }
        html = html.join('');
        province.find('option').remove();
        province.append(html);

        var provinces = province.find('option');
        province.on('change', function () {
          var curSelect = $(this).val();
          provinces.each(function (k, v) {
            if ($(v).val() == curSelect) {
              /*jshint immed: true */
              return (function (v) {
                var extra = $(v).attr(params.metaTag);
                curProvince = extra;
                var html = [], oItem;
                html.push('<option value=""> -- 请选择 -- </option>');
                for (var item in params.data) {
                  if (params.data.hasOwnProperty(item)) {
                    oItem = params.data[ item ];
                    if (oItem[ params.id ] == extra && oItem[ params.children ]) {
                      oItem = oItem[ params.children ];
                      for (var sItem in oItem) {
                        if (oItem.hasOwnProperty(sItem)) {
                          if (params.idVal) {
                            html.push('<option ' + params.metaTag + '="' + oItem[ sItem ][ params.id ] + '" value="' + oItem[ sItem ][ params.id ] + '"' + ((params.selected && (params.selected[ 1 ] == oItem[ sItem ][ params.id ])) ? hasSelected : '') + '>' + oItem[ sItem ][ params.name ] + '</option>');

                          } else {
                            html.push('<option ' + params.metaTag + '="' + oItem[ sItem ][ params.id ] + '" value="' + oItem[ sItem ][ params.name ] + '"' + ((params.selected && (params.selected[ 1 ] == oItem[ sItem ][ params.id ])) ? hasSelected : '') + '>' + oItem[ sItem ][ params.name ] + '</option>');
                          }
                        }
                      }
                      break;
                    }
                  }
                }
                html = html.join('');
                city.find('option').remove();
                city.append(html);

                city.on('change', function () {
                  var curSelect = $(this).val();
                  var cities = city.find('option');
                  cities.each(function (k, v) {
                    if ($(v).val() == curSelect) {
                      /*jshint immed: true */
                      return (function (v) {
                        var extra = $(v).attr(params.metaTag);
                        curCity = extra;
                        var html = [], oItem;
                        html.push('<option value=""> -- 请选择 -- </option>');
                        for (var item in params.data) {
                          if (params.data.hasOwnProperty(item)) {
                            oItem = params.data[ item ];

                            if (oItem[ params.id ] == curProvince && oItem[ params.children ]) {
                              oItem = oItem[ params.children ];
                              for (var sItem in oItem) {
                                if (oItem.hasOwnProperty(sItem)) {
                                  if (oItem[ sItem ][ params.id ] == curCity && oItem[ sItem ][ params.children ]) {
                                    sItem = oItem[ sItem ][ params.children ];
                                    for (var rItem in sItem) {
                                      if (sItem.hasOwnProperty(rItem)) {
                                        if (params.idVal) {
                                          html.push('<option ' + params.metaTag + '="' + sItem[ rItem ][ params.id ] + '" value="' + sItem[ rItem ][ params.id ] + '"' + ((params.selected && (params.selected[ 2 ] == sItem[ rItem ][ params.id ])) ? hasSelected : '') + '>' + sItem[ rItem ][ params.name ] + '</option>');

                                        } else {
                                          html.push('<option ' + params.metaTag + '="' + sItem[ rItem ][ params.id ] + '" value="' + sItem[ rItem ][ params.name ] + '"' + ((params.selected && (params.selected[ 2 ] == sItem[ rItem ][ params.id ])) ? hasSelected : '') + '>' + sItem[ rItem ][ params.name ] + '</option>');
                                        }
                                      }
                                    }
                                    break;
                                  }
                                }
                              }
                              break;
                            }
                          }
                        }
                        html = html.join('');
                        county.find('option').remove();
                        county.append(html);
                      }(v));
                    }
                  });
                }).trigger('change');
                
              }(v));
            }
          });

        }).trigger('change');

      }

      switch (target.length) {
        case 3:
          multipleBox(target, params);
          break;
        default :
          // 参数不存在或者不匹配可接受数量时
          return this;
      }

      return this;
    }
  });

  return $;
});
