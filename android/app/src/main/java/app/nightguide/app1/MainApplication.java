package app.nightguide.app1;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;
import io.sentry.RNSentryPackage;
import com.github.amarcruz.rntextsize.RNTextSizePackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.github.droibit.android.reactnative.customtabs.CustomTabsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new RNFirebasePerformancePackage(),
            new RNSentryPackage(),
            new RNTextSizePackage(),
            new RNScreensPackage(),
            new CustomTabsPackage(),
            new LinearGradientPackage(),
            new SplashScreenReactPackage(),
            new RNGestureHandlerPackage(),
            new RNLanguagesPackage(),
            new RNDeviceInfo()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
