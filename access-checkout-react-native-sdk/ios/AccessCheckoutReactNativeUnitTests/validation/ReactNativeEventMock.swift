import Foundation

struct ReactNativeEventMock {
    let name: String
    let body: Body

    init(_ name: String, bodyDictionary: NSDictionary) {
        self.name = name
        self.body = Body(bodyDictionary)
    }

    struct Body {
        var type: String?
        var isValid: Bool?
        var brand: Brand?

        init(_ dictionary: NSDictionary) {
            self.type = dictionary["type"] as? String
            self.isValid = dictionary["isValid"] as? Bool

            if let valueDictionary = dictionary["value"] as? NSDictionary {
                self.brand = Brand(valueDictionary)
            }
        }
    }

    struct Brand {
        var name: String?
        var images: [Image]?

        init(_ dictionary: NSDictionary) {
            name = dictionary["name"] as? String

            if let imagesDictionary = dictionary["images"] as? [NSDictionary] {
                images = []
                for imageDictionary in imagesDictionary {
                    images!.append(Image(imageDictionary))
                }
            }
        }

        struct Image {
            var type: String?
            var url: String?

            init(_ dictionary: NSDictionary?) {
                if let dictionary = dictionary {
                    self.type = dictionary["type"] as? String
                    self.url = dictionary["url"] as? String
                }
            }
        }
    }
}
