require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "access-checkout-react-native-sdk"
  s.version      = "3.0.0"
  s.summary      = package["description"]
  s.homepage     = package["repository"]["url"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "12.4" }
  s.source       = { :git => "https://github.com/Worldpay/access-checkout-react-native.git", :tag => "#{s.version}" }

  s.source_files = "ios/AccessCheckoutReactNative/**/*.{h,m,mm,swift}"
  s.dependency "AccessCheckoutSDK", "~> 4.1"
  s.resource_bundles = { 'access-checkout-react-native-sdk' => [ 'ios/PrivacyInfo.xcprivacy' ] }

if ENV['USE_FRAMEWORKS']
    exisiting_flags = s.attributes_hash["compiler_flags"]
      if exisiting_flags.present?
        s.compiler_flags = exisiting_flags + "-DCK_USE_FRAMEWORKS=1"
      else
        s.compiler_flags = "-DCK_USE_FRAMEWORKS=1"
      end
  end

  if defined?(install_modules_dependencies()) != nil
    install_modules_dependencies(s)
  else
    s.dependency 'React-Core'
  end

end
