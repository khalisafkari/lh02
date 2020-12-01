import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, LayoutChangeEvent, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {getPostView} from 'lhscan-extensions';
import styles from './styles';
import html from '@utils/html';
import Loading from '@components/loading';
import HeaderRender from '@components/headerRender';
import FooterRender from '@components/footerRender';
import {Navigation} from 'react-native-navigation';
import {chapterAPI} from '@utils/database';
import ads from '@utils/ads';

interface props {
  id: string;
  componentId: string;
  title: string;
}

const Reader: React.FC<props> = (props) => {
  const scrollY = useRef<Animated.Value>(new Animated.Value(0)).current;
  const [layout, setLayout] = useState<number>(0);

  const isMouted = useRef<boolean>(true);
  const [state, setState] = useState<getPostView>({
    content: [],
    next: '',
    prev: '',
  });
  const [osId, setOsId] = React.useState<string | any>(null);

  useEffect(() => {
    return () => {
      isMouted.current = false;
    };
  });

  const onFetch = useCallback(() => {
    getPostView(`https://loveheaven.net/${props.id}`).then((results) => {
      if (isMouted.current) {
        setState(results);
      }
    });
  }, [props.id]);

  useEffect(() => {
    const listener = {
      componentDidAppear: function () {
        onFetch();
      },
      componentDidDisappear: function () {
        ads.showInterstitial();
      },
    };
    const subscriber = Navigation.events().registerComponentListener(
      listener,
      props.componentId,
    );
    return () => {
      subscriber.remove();
    };
  }, [onFetch, props.componentId]);

  // eslint-disable-next-line no-shadow
  const onLayoutSize = useCallback((layout: LayoutChangeEvent) => {
    setLayout(layout.nativeEvent.layout.height);
  }, []);

  const onScrollY = ({nativeEvent}: any) => {
    const layout_size = Math.round(layout);
    const SIZE = Math.round(nativeEvent.contentOffset.y + layout_size);
    if (Math.round(nativeEvent.contentOffset.y) < 56) {
      Animated.timing(scrollY, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }).start();
    } else if (SIZE > Math.round(nativeEvent.contentSize.height - 56)) {
      Animated.timing(scrollY, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }).start();
    } else {
      Animated.timing(scrollY, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }).start();
    }
  };

  const onPrev = useCallback(() => {
    setState({
      content: [],
    });
    setOsId(state.prev);
    chapterAPI.setChapter(state.prev);
    getPostView(`https://loveheaven.net/${state.prev}`).then((results) => {
      setState(results);
    });
  }, [state.prev]);
  const onNext = useCallback(() => {
    setState({
      content: [],
    });
    setOsId(state.next);
    chapterAPI.setChapter(state.next);
    getPostView(`https://loveheaven.net/${state.next}`).then((results) => {
      setState(results);
    });
  }, [state.next]);

  const onMessage = ({nativeEvent}: any) => {
    if (nativeEvent.data === 'up') {
      Animated.timing(scrollY, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {
        // @ts-ignore
        state.content?.length > 1 ? (
          <WebView
            onLayout={onLayoutSize}
            source={{
              baseUrl: 'https://loveheaven.net',
              html: html(state.content),
            }}
            onScroll={onScrollY}
            onMessage={onMessage}
          />
        ) : (
          <Loading />
        )
      }
      <HeaderRender
        componentId={props.componentId}
        isTitle={props.id}
        isSubtitle={osId ? osId : props.id}
        scrollY={scrollY}
      />
      <FooterRender
        prevPress={{
          disable: !state.prev,
          onPress: onPrev,
        }}
        nextPress={{
          disable: !state.next,
          onPress: onNext,
        }}
        scrollY={scrollY}
      />
    </View>
  );
};

export default Reader;
