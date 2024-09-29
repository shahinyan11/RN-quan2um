#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"
// add this import statement at the top of your `AppDelegate.m` file
#import "RNFBMessagingModule.h"

#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
#import <FBSDKCoreKit/FBSDKCoreKit-swift.h>
#import <React/RCTLinkingManager.h>
// CUSTOM-START
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
#import <CodePush/CodePush.h>
// CUSTOM-END

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.moduleName = @"QuantumApp";
    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = @{};

    [FIRApp configure];

    // CUSTOM -> For AppCenter
    [AppCenterReactNative register];
    [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
    [AppCenterReactNativeCrashes registerWithAutomaticProcessing];
    // <-

    [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];

    return [super application:application didFinishLaunchingWithOptions:launchOptions];

}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
    return YES;
  }

  if ([RCTLinkingManager application:app openURL:url options:options]) {
    return YES;
  }

  return NO;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
    #if DEBUG
      return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
    #else
        // CUSTOM-START
        // return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
        return [CodePush bundleURL];
        // CUSTOM-END
    #endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
