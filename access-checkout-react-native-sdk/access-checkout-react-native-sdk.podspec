require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "access-checkout-react-native-sdk"
  s.version      = "4.0.1"
  s.summary      = package["description"]
  s.homepage     = package["repository"]["url"]
  s.license      = package["license"]
  s.authors      = package["author"]
  s.platforms    = { :ios => "13.0" }
  s.source       = { :git => "https://github.com/Worldpay/access-checkout-react-native.git", :tag => "#{s.version}" }

  s.source_files = "ios/AccessCheckoutReactNative/**/*.{h,m,mm,swift}"
  s.resource_bundles = { 'access-checkout-react-native-sdk' => [ 'ios/PrivacyInfo.xcprivacy' ] }

  s.dependency 'React-Core'
  s.dependency "AccessCheckoutSDK", "~> 4.1"

  s.pod_target_xcconfig = {
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++20",
  }

  if ENV["USE_FRAMEWORKS"]
    existing_flags = s.attributes_hash["compiler_flags"]
    s.compiler_flags = [existing_flags, "-DCK_USE_FRAMEWORKS=1"].compact.join(" ")
  end

  if defined?(install_modules_dependencies)
    install_modules_dependencies(s)
  end

end
