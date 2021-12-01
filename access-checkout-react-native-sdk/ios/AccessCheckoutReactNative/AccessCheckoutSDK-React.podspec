require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))

Pod::Spec.new do |s|
  s.name         = "AccessCheckoutSDK-React"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "git@github.worldpay.com:access-for-ecomm/checkout-react-native-poc.git", :tag => "#{s.version}" }

  s.source_files = "*.{h,m,mm,swift}"

  s.dependency "React-Core"
  s.dependency "AccessCheckoutSDK", "~> 2.3.0"
end
