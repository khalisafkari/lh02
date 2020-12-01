// @ts-ignore
import AppLovinMAX from 'react-native-applovin-max';

let listener: any | undefined;
let time: any | undefined;
let retry: number = 0;

export default {
  loadInterstitial: function () {
    listener = AppLovinMAX;
    listener.addEventListener('OnInterstitialLoadedEvent', () => {
      retry = 0;
    });
    listener.addEventListener('OnInterstitialLoadFailedEvent', () => {
      time = setTimeout(() => {
        this.callAd();
      }, Math.pow(2, Math.min(6, retry)) * 1000);
    });
    listener.addEventListener('OnInterstitialClickedEvent', () => {});
    listener.addEventListener('OnInterstitialDisplayedEvent', () => {
      this.callAd();
    });
    listener.addEventListener('OnInterstitialAdFailedToDisplayEvent', () => {});
    listener.addEventListener('OnInterstitialHiddenEvent', () => {});
    this.callAd();
  },
  removeEventListener: function () {
    listener.removeEventListener('OnInterstitialLoadedEvent', () => {});
    listener.removeEventListener('OnInterstitialLoadFailedEvent', () => {});
    listener.removeEventListener('OnInterstitialClickedEvent', () => {});
    listener.removeEventListener('OnInterstitialDisplayedEvent', () => {});
    listener.removeEventListener(
      'OnInterstitialAdFailedToDisplayEvent',
      () => {},
    );
    listener.removeEventListener('OnInterstitialHiddenEvent', () => {});
    if (time !== undefined) {
      clearTimeout(time);
    }
    listener = undefined;
  },
  callAd: function () {
    if (listener !== undefined) {
      listener.loadInterstitial('6672ac0b1275dab0');
    }
  },
  showInterstitial: function () {
    if (listener !== undefined) {
      if (listener.isInterstitialReady('6672ac0b1275dab0')) {
        listener.showInterstitial('6672ac0b1275dab0');
      }
      this.removeEventListener();
    }
  },
};
