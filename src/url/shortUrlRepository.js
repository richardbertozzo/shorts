import UrlSchema from '../schemas/urlSchema';

export default class ShortUrlRepository {
  /**
   * @name getShortUrlById
   * @param shortUrlId {int}
   * @return {Promise}
   */
  getShortUrlById(shortUrlId, referer) {
    return UrlSchema.findOneAndUpdate({
      shortUrl: shortUrlId
    }, {
      $inc: {'hits.count': 1},
      $set: {'hits.lastHit': new Date()},
      $push: {requests: referer}
    });
  }

  /**
   * @name persist
   * @param ShortUrl {Object} Short URL schema
   * @return {Promise} Persist a Short URL and returns a promise
   */
  persist(ShortUrl) {
    return ShortUrl.save();
  }

  /**
   * @name dataTransferObject
   * @return {Object} Format response to be exposed
   */
  dataTransferObject(data) {
    return {
      id: data.id,
      url: data.url,
      shortUrl: `${data.shortUrl}`,
      hits: data.hits
    };
  }
}
