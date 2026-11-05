require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "access-checkout-react-native-sdk"
  s.version      = "4.1.0"
  s.summary      = package["description"]
  s.homepage     = package["repository"]["url"]
  s.license      = package["license"]
  s.authors      = package["author"]
  s.platforms    = { :ios => "15.0" }
  s.source       = { :git => "https://github.com/Worldpay/access-checkout-react-native.git", :tag => "#{s.version}" }

  s.source_files = "ios/AccessCheckoutReactNative/**/*.{h,m,mm,swift}"
  # NB: PrivacyInfo.xcprivacy lives inside ios/AccessCheckoutReactNative so that it
  # both ships in the npm package (covered by the "ios/AccessCheckoutReactNative"
  # entry in package.json "files") and sits within the SPM target path.
  s.resource_bundles = { 'access-checkout-react-native-sdk' => [ 'ios/AccessCheckoutReactNative/PrivacyInfo.xcprivacy' ] }

  s.dependency 'React-Core'
  s.dependency "AccessCheckoutSDK", "~> 4.1"

  xcconfig = {
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++20",
    "DEFINES_MODULE"              => "YES",
    'USE_HEADERMAP'               => 'YES',
    'SWIFT_COMPILATION_MODE'      => 'wholemodule'
  }
  s.pod_target_xcconfig = xcconfig

  install_modules_dependencies(s)
end
