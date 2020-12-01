import analytics from '@react-native-firebase/analytics';
import {Navigation, Options} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import {useCallback, useEffect} from 'react';
// @ts-ignore
import AppLovinMAX from 'react-native-applovin-max';

interface props {
  id: string;
  title: string;
  image: string;
  componentId: string;
}

export default {
  component: function (name: string, options?: Options, passProps?: any) {
    return {
      component: {
        name: `net.loveheaven.${name}`,
        options,
        passProps,
      },
    };
  },
  stack: function (name: string, options?: Options) {
    return {
      stack: {
        children: [this.component(name, options)],
      },
    };
  },
  init: function () {
    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setRoot({
        root: {
          ...this.component('splash'),
        },
      });
    });
  },
  tabs: function () {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            this.stack('home', {
              bottomTab: {
                icon: Icon.getImageSourceSync('home', 25),
              },
            }),
            this.stack('list', {
              bottomTab: {
                icon: Icon.getImageSourceSync('database', 25),
              },
              topBar: {
                rightButtons: [
                  {
                    id: 'info-search',
                    icon: Icon.getImageSourceSync('search1', 20),
                  },
                ],
              },
            }),
            this.stack('bookmark', {
              bottomTab: {
                icon: Icon.getImageSourceSync('book', 25),
              },
            }),
            this.stack('settings', {
              bottomTab: {
                icon: Icon.getImageSourceSync('setting', 25),
              },
            }),
          ],
        },
      },
    });
  },
  themesBlack: function () {
    Navigation.setDefaultOptions({
      layout: {
        backgroundColor: '#1e222b',
      },
      statusBar: {
        backgroundColor: '#1e222b',
        hideWithTopBar: false,
      },
      topBar: {
        background: {
          color: '#262b36',
        },
        backButton: {
          color: '#fff',
        },
        title: {
          color: '#fff',
          alignment: 'fill',
          fontSize: 14,
        },
        rightButtonColor: '#fff',
      },
      bottomTab: {
        selectedIconColor: '#fff',
      },
      bottomTabs: {
        tabsAttachMode: 'onSwitchToTab',
        backgroundColor: '#262b36',
        titleDisplayMode: 'alwaysHide',
      },
    });
  },
  push: function (
    componentId: string,
    name: string,
    options?: Options,
    passProps?: any,
  ) {
    Navigation.push(componentId, {
      ...this.component(name, options, passProps),
    });
  },
  useDetail: function (props: props) {
    const onCall = useCallback(() => {
      const subscriber = Navigation.events().registerNavigationButtonPressedListener(
        ({buttonId}) => {
          if (buttonId === 'info-content') {
            this.push(
              props.componentId,
              'detail',
              {
                topBar: {
                  title: {
                    text: props.title,
                  },
                },
                bottomTabs: {
                  visible: false,
                },
              },
              {
                id: props.id,
                title: props.title,
                image: props.image,
              },
            );
          }
        },
      );
      return () => {
        subscriber.remove();
      };
    }, [props.componentId, props.id, props.image, props.title]);
    useEffect(onCall, []);
  },
  useSearch: function (
    componentId: string,
    name: string,
    options?: Options,
    passProps?: any,
  ) {
    const onFetchSearch = useCallback(() => {
      const subscriber = Navigation.events().registerNavigationButtonPressedListener(
        ({buttonId}) => {
          if (buttonId === 'info-search') {
            this.push(componentId, name, options, passProps);
          }
        },
      );
      return () => {
        subscriber.remove();
      };
    }, [componentId, name, options, passProps]);
    useEffect(onFetchSearch, []);
  },
  modal: function (name: string, options?: Options, passProps?: any) {
    Navigation.showModal({
      ...this.component(name, options, passProps),
    });
  },
  ads: function () {
    AppLovinMAX.initialize(
      'ioiA26xeiE7sp2y_ooxmzkBikQXzCG2GIIv3T2VKprroz_-gccPp6TZXuZbivFqOP2a3n02TC9W5yDJK3O4QGm',
      () => {},
    );
  },
};

Navigation.events().registerComponentDidAppearListener(
  async ({componentType, componentName}) => {
    if (componentType === 'Component') {
      await analytics().logScreenView({
        screen_class: componentName,
        screen_name: componentName,
      });
    }
  },
);
