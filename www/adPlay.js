module.exports = {

    _availableReawardBase: false,
    _availableUnReawardBase: false,
    __availableFullscreenBanner: false,
    //

    init: function (applicationId, developerId) {
        var self = this;
        cordova.exec(
            function (result) {
                console.log('setUp succeeded.' + result);

                if (typeof result == "string") {
                    //
                    if (result.indexOf("onAdComplete") > -1) {
                        var arr = result.split(',');
                        self._availableReawardBase = false;
                        self._availableUnReawardBase = false;
                        self.__availableFullscreenBanner = false;
                        if (arr[1] == "true") {
                            if (self.onAdCompleteRewardBase)
                                self.onAdCompleteRewardBase();
                        }
                        else {
                            if (self.onAdCompleteUnRewardBase)
                                self.onAdCompleteUnRewardBase();
                        }


                    }
                    if (result == "onInstallationComplete") {
                        if (self.onInstallationComplete)
                            self.onInstallationComplete();
                    }
                    if (result.indexOf("onAdAvailable") > -1) {
                        var arr = result.split(',');
                        if (arr[1] == "true") {
                            if (!self._availableReawardBase) {
                                self._availableReawardBase = true;
                                if (self.onAdAvailableRewardBase)
                                    self.onAdAvailableRewardBase();
                            }
                        } else if (arr[1] == "false") {
                            if (!self._availableUnReawardBase) {
                                self._availableUnReawardBase = true;
                                if (self.onAdAvailableUnRewardBase)
                                    self.onAdAvailableUnRewardBase();
                            }
                        } else {
                            self.__availableFullscreenBanner = true;
                        }


                    }
                    if (result == "onAdFail") {
                        self._availableReawardBase = false;
                        self._availableUnReawardBase = false;
                        self.__availableFullscreenBanner = false;
                        if (self.onAdFail) {
                            self.onAdFail();
                        }

                    }
                    if (result.indexOf("onAdNotAvailable") > -1)
                    {

                        var arr = result.split(',');
                        if (arr[1] == "true") {
                            self._availableReawardBase = false;
                        } else if (arr[1] == "false") {
                            self._availableUnReawardBase = false;
                        } else {
                            self.__availableFullscreenBanner = false ;
                        }

                    }

                    if (result.indexOf("onConsumablePurchased") > -1) {
                        var arr = result.split(',');
                        if (self.onConsumablePurchased)
                            self.onConsumablePurchased(arr[1]);
                    }
                    if (result.indexOf("onNonConsumablePurchased") > -1) {

                        var arr = result.split(',');
                        if (self.onNonConsumablePurchased)
                            self.onNonConsumablePurchased(arr[1]);
                    }
                    if (result.indexOf("onPurchaseFail") > -1) {
                        var arr = result.split(',');
                        if (self.onPurchaseFail)
                            self.onPurchaseFail(arr[1]);
                    }


                }
                else {
                    //if (result["event"] == "onXXX") {
                    //	//result["message"]
                    //	if (self.onXXX)
                    //		self.onXXX(result);
                    //}
                }
            },
            function (error) {
                console.log('setUp failed.');
            },
            'adPlayCordovaInterface',
            'init',
            [applicationId, developerId]
        );
    },
    showAdRewardBase: function () {
        cordova.exec(
            null,
            null,
            'adPlayCordovaInterface',
            'showAd',
            [true]
        );
    },
    showAdUnRewardBase: function () {
        cordova.exec(
            null,
            null,
            'adPlayCordovaInterface',
            'showAd',
            [false]
        );
    },
    showFullscreenBannerAd: function () {
        cordova.exec(
            null,
            null,
            'adPlayCordovaInterface',
            'showFullscreenBannerAd',
            []
        );
    },
    dispose: function () {
        cordova.exec(
            null,
            null,
            'adPlayCordovaInterface',
            'dispose',
            []
        );
    },
    setTestModeOn: function () {
        cordova.exec(
            null,
            null,
            'adPlayCordovaInterface',
            'setTestMode',
            [true]
        );
    },
    setTestModeOff: function () {
        cordova.exec(
            null,
            null,
            'adPlayCordovaInterface',
            'setTestMode',
            [false]
        );
    },
    checkAdAvailabilityRewardBase: function () {
        cordova.exec
        (
            null,
            null,
            'adPlayCordovaInterface',
            'checkAdAvailability',
            [true]
        );
        return this._availableReawardBase;
    }, checkAdAvailabilityUnRewardBase: function () {
        cordova.exec(
            null,
            null,
            'adPlayCordovaInterface',
            'checkAdAvailability',
            [false]
        );
        return this._availableUnReawardBase;
    },
    checkFullscreenBannerAvailability: function () {
        cordova.exec(
            null,
            null,
            'adPlayCordovaInterface',
            'checkFullscreenBannerAvailability',
            []
        );
        return this.__availableFullscreenBanner;
    },
    initIAB: function (RSAKey, consumables, nonConsumables) {
        cordova.exec(
            null,
            null,
            'adPlayCordovaInterface',
            'initIAB',
            [RSAKey, consumables, nonConsumables]
        );
    },
    startIAB: function (element, payLoad) {
        cordova.exec(
            null,
            null,
            'adPlayCordovaInterface',
            'startIAB',
            [element, payLoad]
        );
    },
    onAdAvailableRewardBase: null,
    onAdAvailableUnRewardBase: null,
    onAdFail: null,
    onAdCompleteRewardBase: null,
    onAdCompleteUnRewardBase: null,
    onInstallationComplete: null,
    onConsumablePurchased: null,
    onNonConsumablePurchased: null,
    onPurchaseFail: null




};