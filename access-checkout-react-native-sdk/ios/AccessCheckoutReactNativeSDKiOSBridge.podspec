require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))

Pod::Spec.new do |s|
  s.name         = "AccessCheckoutReactNativeSDKiOSBridge"
  s.version      = "2.0.9"
  s.summary      = package["description"]
  s.homepage     = package["repository"]["url"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "12.4" }
  s.source       = { :git => "https://github.com/Worldpay/access-checkout-react-native.git", :tag => "#{s.version}" }

  s.source_files = "AccessCheckoutReactNative/**/*.{h,m,mm,swift}"

  s.dependency "React-Core"
  s.dependency "AccessCheckoutSDK", "~> 3.0.0"
end
