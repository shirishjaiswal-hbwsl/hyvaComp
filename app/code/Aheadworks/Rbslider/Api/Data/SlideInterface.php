<?php
/**
 * Aheadworks Inc.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the EULA
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://aheadworks.com/end-user-license-agreement/
 *
 * @package    Rbslider
 * @version    1.4.5
 * @copyright  Copyright (c) 2022 Aheadworks Inc. (https://aheadworks.com/)
 * @license    https://aheadworks.com/end-user-license-agreement/
 */
namespace Aheadworks\Rbslider\Api\Data;

/**
 * Slide interface
 * @api
 */
interface SlideInterface extends \Magento\Framework\Api\ExtensibleDataInterface
{
    /**#@+
     * Constants defined for keys of the data array.
     * Identical to the name of the getter in snake case
     */
    const ID = 'id';
    const NAME = 'name';
    const STATUS = 'status';
    const STORE_IDS = 'store_ids';
    const CUSTOMER_GROUP_IDS = 'customer_group_ids';
    const CUSTOMER_SEGMENT_IDS = 'customer_segment_ids';
    const DISPLAY_FROM = 'display_from';
    const DISPLAY_TO = 'display_to';
    const IMG_TYPE = 'img_type';
    const IMG_FILE = 'img_file';
    const IMG_URL = 'img_url';
    const MOBILE_IMG_FILE = 'mobile_img_file';
    const MOBILE_IMG_URL = 'mobile_img_url';
    const IMG_TITLE = 'img_title';
    const IMG_ALT = 'img_alt';
    const URL = 'url';
    const IS_OPEN_URL_IN_NEW_WINDOW = 'is_open_url_in_new_window';
    const IS_ADD_NOFOLLOW_TO_URL = 'is_add_nofollow_to_url';
    const BANNER_IDS = 'banner_ids';
    const STAT_ID = 'stat_id';
    const CONTENT = 'content';
    const OVERLAY_POSITION = 'overlay_position';
    /**#@-*/

    /**
     * Get ID
     *
     * @return int|null
     */
    public function getId();

    /**
     * Set ID
     *
     * @param int $id
     * @return $this
     */
    public function setId($id);

    /**
     * Get status
     *
     * @return int
     */
    public function getStatus();

    /**
     * Set status
     *
     * @param int $status
     * @return $this
     */
    public function setStatus($status);

    /**
     * Get name
     *
     * @return string
     */
    public function getName();

    /**
     * Set name
     *
     * @param string $name
     * @return $this
     */
    public function setName($name);

    /**
     * Get store ids
     *
     * @return int[]
     */
    public function getStoreIds();

    /**
     * Set store ids
     *
     * @param int[] $storeIds
     * @return $this
     */
    public function setStoreIds($storeIds);

    /**
     * Get customer group ids
     *
     * @return int[]
     */
    public function getCustomerGroupIds();

    /**
     * Set customer segment ids
     *
     * @param int[] $customerSegmentIds
     * @return $this
     */
    public function setCustomerSegmentIds($customerSegmentIds);

    /**
     * Get customer segment ids
     *
     * @return int[]
     */
    public function getCustomerSegmentIds();

    /**
     * Set customer group ids
     *
     * @param int[] $customerGroupIds
     * @return $this
     */
    public function setCustomerGroupIds($customerGroupIds);

    /**
     * Get display from
     *
     * @return string
     */
    public function getDisplayFrom();

    /**
     * Set display from
     *
     * @param string $displayFrom
     * @return $this
     */
    public function setDisplayFrom($displayFrom);

    /**
     * Get display to
     *
     * @return string
     */
    public function getDisplayTo();

    /**
     * Set display to
     *
     * @param string $displayTo
     * @return $this
     */
    public function setDisplayTo($displayTo);

    /**
     * Get img type
     *
     * @return int
     */
    public function getImgType();

    /**
     * Set img type
     *
     * @param int $imgType
     * @return $this
     */
    public function setImgType($imgType);

    /**
     * Get img file
     *
     * @return string
     */
    public function getImgFile();

    /**
     * Set img file
     *
     * @param string $imgFile
     * @return $this
     */
    public function setImgFile($imgFile);

    /**
     * Get mobile img file
     *
     * @return string
     */
    public function getMobileImgFile();

    /**
     * Set mobile img file
     *
     * @param string $imgFile
     * @return $this
     */
    public function setMobileImgFile($imgFile);

    /**
     * Get img url
     *
     * @return string
     */
    public function getImgUrl();

    /**
     * Set img url
     *
     * @param string $imgUrl
     * @return $this
     */
    public function setImgUrl($imgUrl);

    /**
     * Get mobile img url
     *
     * @return string
     */
    public function getMobileImgUrl();

    /**
     * Set mobile img url
     *
     * @param string $imgUrl
     * @return $this
     */
    public function setMobileImgUrl($imgUrl);

    /**
     * Get img title
     *
     * @return string
     */
    public function getImgTitle();

    /**
     * Set img title
     *
     * @param string $imgTitle
     * @return $this
     */
    public function setImgTitle($imgTitle);

    /**
     * Get img alt
     *
     * @return string
     */
    public function getImgAlt();

    /**
     * Set img alt
     *
     * @param string $imgAlt
     * @return $this
     */
    public function setImgAlt($imgAlt);

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl();

    /**
     * Set url
     *
     * @param string $url
     * @return $this
     */
    public function setUrl($url);

    /**
     * Get is open url in new window
     *
     * @return bool
     * @SuppressWarnings(PHPMD.BooleanGetMethodName)
     */
    public function getIsOpenUrlInNewWindow();

    /**
     * Set is open url in new window
     *
     * @param bool $isOpenUrlInNewWindow
     * @return $this
     */
    public function setIsOpenUrlInNewWindow($isOpenUrlInNewWindow);

    /**
     * Get is add nofollow to url
     *
     * @return bool
     * @SuppressWarnings(PHPMD.BooleanGetMethodName)
     */
    public function getIsAddNofollowToUrl();

    /**
     * Set is add nofollow to url
     *
     * @param bool $isAddNofollowToUrl
     * @return $this
     */
    public function setIsAddNofollowToUrl($isAddNofollowToUrl);

    /**
     * Get banner ids
     *
     * @return int[]
     */
    public function getBannerIds();

    /**
     * Set banner ids
     *
     * @param int[] $bannerIds
     * @return $this
     */
    public function setBannerIds($bannerIds);

    /**
     * Get content
     *
     * @return string
     */
    public function getContent();

    /**
     * Set content
     *
     * @param string $content
     * @return $this
     */
    public function setContent($content);

    /**
     * Get overlay position
     *
     * @return int
     */
    public function getOverlayPosition();

    /**
     * Set overlay position
     *
     * @param int $overlayPosition
     * @return $this
     */
    public function setOverlayPosition($overlayPosition);

    /**
     * Retrieve existing extension attributes object or create a new one.
     *
     * @return \Aheadworks\Rbslider\Api\Data\SlideExtensionInterface|null
     */
    public function getExtensionAttributes();

    /**
     * Set an extension attributes object.
     *
     * @param \Aheadworks\Rbslider\Api\Data\SlideExtensionInterface $extensionAttributes
     * @return $this
     */
    public function setExtensionAttributes(\Aheadworks\Rbslider\Api\Data\SlideExtensionInterface $extensionAttributes);
}
