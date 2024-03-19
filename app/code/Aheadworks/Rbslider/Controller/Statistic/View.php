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
declare(strict_types=1);

namespace Aheadworks\Rbslider\Controller\Statistic;

use Aheadworks\Rbslider\Api\ActionLogManagementInterface;
use Aheadworks\Rbslider\Api\BlockRepositoryInterface;
use Aheadworks\Rbslider\Model\Statistic\SessionManager as StatisticSession;
use Magento\Customer\Model\Session as CustomerSession;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Controller\Result\Json as ResultJson;
use Magento\Framework\Controller\Result\Redirect as ResultRedirect;
use Magento\Framework\Controller\ResultFactory;
use Magento\Framework\Controller\ResultInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Store\Model\StoreManagerInterface;

/**
 * Class Process
 * @package Aheadworks\Rbslider\Controller\View
 */
class View implements HttpGetActionInterface
{
    /**
     * @var ResultFactory
     */
    private $resultFactory;

    /**
     * @var CustomerSession
     */
    private $customerSession;

    /**
     * @var StatisticSession
     */
    private $statisticSession;

    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * @var StoreManagerInterface
     */
    private $storeManager;

    /**
     * @var BlockRepositoryInterface
     */
    private $blockRepository;

    /**
     * @var ActionLogManagementInterface
     */
    private $actionLogManagement;

    /**
     * @param ResultFactory $resultFactory
     * @param CustomerSession $customerSession
     * @param StatisticSession $statisticSession
     * @param RequestInterface $request
     * @param StoreManagerInterface $storeManager
     * @param BlockRepositoryInterface $blockRepository
     * @param ActionLogManagementInterface $actionLogManagement
     */
    public function __construct(
        ResultFactory $resultFactory,
        CustomerSession $customerSession,
        StatisticSession $statisticSession,
        RequestInterface $request,
        StoreManagerInterface $storeManager,
        BlockRepositoryInterface $blockRepository,
        ActionLogManagementInterface $actionLogManagement
    ) {
        $this->resultFactory = $resultFactory;
        $this->customerSession = $customerSession;
        $this->statisticSession = $statisticSession;
        $this->request = $request;
        $this->storeManager = $storeManager;
        $this->blockRepository = $blockRepository;
        $this->actionLogManagement = $actionLogManagement;
    }

    /**
     * Update view statistic for banners
     *
     * @return ResultInterface
     * @throws LocalizedException
     * @throws NoSuchEntityException
     */
    public function execute()
    {
        if (!$this->request->isAjax()) {
            /** @var ResultRedirect $resultRedirect */
            $resultRedirect = $this->resultFactory->create(ResultFactory::TYPE_REDIRECT);
            return $resultRedirect->setRefererOrBaseUrl();
        }

        $bannerIdsJson = $this->request->getParam('bannerIds');
        $bannerIds  = $this->getBannerIdsFromJsonData($bannerIdsJson);
        $this->updateViewStatistic($bannerIds);

        /** @var ResultJson $resultJson */
        $resultJson = $this->resultFactory->create(ResultFactory::TYPE_JSON);
        return $resultJson->setData([]);
    }

    /**
     * Retrieve banner ids from json data
     *
     * @param string $bannerIdsJson
     * @return array
     */
    private function getBannerIdsFromJsonData($bannerIdsJson)
    {
        $bannerIds = [];
        $bannerIdsDataArray = json_decode($bannerIdsJson);
        if ($bannerIdsDataArray && is_array($bannerIdsDataArray)) {
            foreach ($bannerIdsDataArray as $bannerId) {
                $bannerIds[] = $bannerId;
            }
        }
        return array_unique($bannerIds);
    }

    /**
     * Update view statistic
     *
     * @param int[] $bannerIds
     * @throws LocalizedException
     * @throws NoSuchEntityException
     */
    private function updateViewStatistic(array $bannerIds): void
    {
        $storeId = $this->storeManager->getStore()->getId();
        $customer = $this->customerSession->getCustomer();
        $customerId = (int) $customer->getId() ?: null;

        foreach ($bannerIds as $bannerId) {
            $block = $this->blockRepository->getByBannerId($bannerId, $storeId, $customer->getGroupId());

            foreach ($block->getSlides() as $slide) {
                $slideId = $slide->getId();

                if ($this->statisticSession->isUniqueAction($bannerId, $slideId, 'view')) {
                    $this->actionLogManagement->addView($bannerId, $slide->getId(), $customerId);
                }
            }
        }
    }
}
