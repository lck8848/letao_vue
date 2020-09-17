"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLunBoData = getLunBoData;
exports.getRecommend = getRecommend;
exports.getNewsListData = getNewsListData;
exports.getGoodsListData = getGoodsListData;
exports.getNewsDetailData = getNewsDetailData;
exports.getNewsCommentData = getNewsCommentData;
exports.postCommentData = postCommentData;
exports.getPhotoCateData = getPhotoCateData;
exports.getPhotoCateListData = getPhotoCateListData;
exports.getPhotoThumbData = getPhotoThumbData;
exports.getGoodsInfoData = getGoodsInfoData;
exports.getCarData = getCarData;
exports.userLogin = userLogin;
exports.isLogin = isLogin;
exports.userAddressData = userAddressData;
exports.addUserAddressData = addUserAddressData;
exports.deleteUserAddressData = deleteUserAddressData;
exports.updateUserAddressData = updateUserAddressData;
exports.commitOrder = commitOrder;
exports.userOrder = userOrder;

var _config = _interopRequireDefault(require("./config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getLunBoData() {
  return regeneratorRuntime.async(function getLunBoData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_config["default"].get('/getlunbo'));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getRecommend() {
  var limit,
      _args2 = arguments;
  return regeneratorRuntime.async(function getRecommend$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          limit = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 6;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_config["default"].get("/recommend?limit=".concat(limit)));

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getNewsListData() {
  var page,
      pagesize,
      _args3 = arguments;
  return regeneratorRuntime.async(function getNewsListData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          page = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : 1;
          pagesize = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 5;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_config["default"].get("/getnewslist?page=".concat(page, "&pagesize=").concat(pagesize)));

        case 4:
          return _context3.abrupt("return", _context3.sent);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function getGoodsListData() {
  var pageindex,
      _args4 = arguments;
  return regeneratorRuntime.async(function getGoodsListData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          pageindex = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : 1;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_config["default"].get("getgoods?pageindex=".concat(pageindex)));

        case 3:
          return _context4.abrupt("return", _context4.sent);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function getNewsDetailData(id) {
  return regeneratorRuntime.async(function getNewsDetailData$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_config["default"].get("/getnew/".concat(id)));

        case 2:
          return _context5.abrupt("return", _context5.sent);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function getNewsCommentData(id, page) {
  return regeneratorRuntime.async(function getNewsCommentData$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_config["default"].get("/getcomments/".concat(id, "?pageindex=").concat(page)));

        case 2:
          return _context6.abrupt("return", _context6.sent);

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function postCommentData(id, content) {
  return regeneratorRuntime.async(function postCommentData$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(_config["default"].post("/postcomment/".concat(id), {
            content: content
          }));

        case 2:
          return _context7.abrupt("return", _context7.sent);

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function getPhotoCateData() {
  return regeneratorRuntime.async(function getPhotoCateData$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(_config["default"].get("/getcategory"));

        case 2:
          return _context8.abrupt("return", _context8.sent);

        case 3:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function getPhotoCateListData(id) {
  return regeneratorRuntime.async(function getPhotoCateListData$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(_config["default"].get("/getcatelist/".concat(id)));

        case 2:
          return _context9.abrupt("return", _context9.sent);

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function getPhotoThumbData(id) {
  return regeneratorRuntime.async(function getPhotoThumbData$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(_config["default"].get("/getthumbimages/".concat(id)));

        case 2:
          return _context10.abrupt("return", _context10.sent);

        case 3:
        case "end":
          return _context10.stop();
      }
    }
  });
}

function getGoodsInfoData(id) {
  return regeneratorRuntime.async(function getGoodsInfoData$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(_config["default"].get("/getgoodsinfo/".concat(id)));

        case 2:
          return _context11.abrupt("return", _context11.sent);

        case 3:
        case "end":
          return _context11.stop();
      }
    }
  });
}

function getCarData(ids) {
  return regeneratorRuntime.async(function getCarData$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(_config["default"].get("/getshopcarlist/".concat(ids)));

        case 2:
          return _context12.abrupt("return", _context12.sent);

        case 3:
        case "end":
          return _context12.stop();
      }
    }
  });
}

function userLogin(data) {
  return regeneratorRuntime.async(function userLogin$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(_config["default"].post("/login", data));

        case 2:
          return _context13.abrupt("return", _context13.sent);

        case 3:
        case "end":
          return _context13.stop();
      }
    }
  });
}

function isLogin() {
  var token;
  return regeneratorRuntime.async(function isLogin$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          token = localStorage.getItem('token');
          _context14.prev = 1;
          _context14.next = 4;
          return regeneratorRuntime.awrap(_config["default"].post("/checktoken?token=".concat(token)));

        case 4:
          _context14.next = 8;
          break;

        case 6:
          _context14.prev = 6;
          _context14.t0 = _context14["catch"](1);

        case 8:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[1, 6]]);
}

function userAddressData(userid) {
  return regeneratorRuntime.async(function userAddressData$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(_config["default"].get("/getaddress/".concat(userid, "?v=").concat(Math.random())));

        case 2:
          return _context15.abrupt("return", _context15.sent);

        case 3:
        case "end":
          return _context15.stop();
      }
    }
  });
}

function addUserAddressData(userid, addressInfo) {
  return regeneratorRuntime.async(function addUserAddressData$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap(_config["default"].post("/addaddress/".concat(userid), addressInfo));

        case 2:
          return _context16.abrupt("return", _context16.sent);

        case 3:
        case "end":
          return _context16.stop();
      }
    }
  });
}

function deleteUserAddressData(addessid) {
  return regeneratorRuntime.async(function deleteUserAddressData$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(_config["default"].post("/deladdress/".concat(addessid)));

        case 2:
          return _context17.abrupt("return", _context17.sent);

        case 3:
        case "end":
          return _context17.stop();
      }
    }
  });
}

function updateUserAddressData(addressid, addressInfo) {
  return regeneratorRuntime.async(function updateUserAddressData$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(_config["default"].post("/updateaddress/".concat(addressid), addressInfo));

        case 2:
          return _context18.abrupt("return", _context18.sent);

        case 3:
        case "end":
          return _context18.stop();
      }
    }
  });
} // 提交订单接口


function commitOrder(orderData) {
  return regeneratorRuntime.async(function commitOrder$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return regeneratorRuntime.awrap(_config["default"].post("/commitorder", orderData));

        case 2:
          return _context19.abrupt("return", _context19.sent);

        case 3:
        case "end":
          return _context19.stop();
      }
    }
  });
} // 获取用户的订单数据


function userOrder(user_id) {
  return regeneratorRuntime.async(function userOrder$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return regeneratorRuntime.awrap(_config["default"].post("/userorder/".concat(user_id)));

        case 2:
          return _context20.abrupt("return", _context20.sent);

        case 3:
        case "end":
          return _context20.stop();
      }
    }
  });
}