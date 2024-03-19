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
namespace Aheadworks\Rbslider\Test\Unit\Controller\Adminhtml\Slide;

use Aheadworks\Rbslider\Api\Data\SlideInterface;
use Aheadworks\Rbslider\Api\SlideRepositoryInterface;
use Aheadworks\Rbslider\Controller\Adminhtml\Slide\MassRemoveFromBanner;
use Aheadworks\Rbslider\Model\ResourceModel\Slide\Collection;
use Aheadworks\Rbslider\Model\ResourceModel\Slide\CollectionFactory;
use Aheadworks\Rbslider\Model\Slide;
use Magento\Backend\App\Action\Context;
use Magento\Backend\Model\View\Result\Redirect;
use Magento\Backend\Model\View\Result\RedirectFactory;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Message\ManagerInterface;
use Magento\Framework\TestFramework\Unit\Helper\ObjectManager;
use Magento\Ui\Component\MassAction\Filter;
use PHPUnit\Framework\MockObject\MockObject;

/**
 * Test for \Aheadworks\Rbslider\Controller\Adminhtml\Slide\MassStatus
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class MassRemoveFromBannerTest extends \PHPUnit\Framework\TestCase
{
    /**
     * @var MassRemoveFromBanner
     */
    private $controller;

    /**
     * @var RedirectFactory|MockObject
     */
    private $resultRedirectFactoryMock;

    /**
     * @var ManagerInterface|MockObject
     */
    private $messageManagerMock;

    /**
     * @var CollectionFactory|MockObject
     */
    private $collectionFactoryMock;

    /**
     * @var Filter|MockObject
     */
    private $filterMock;

    /**
     * @var SlideRepositoryInterface|MockObject
     */
    private $slideRepositoryMock;

    /**
     * @var RequestInterface|MockObject
     */
    private $requestMock;

    /**
     * Init mocks for tests
     *
     * @return void
     */
    protected function setUp(): void
    {
        $objectManager = new ObjectManager($this);

        $this->resultRedirectFactoryMock = $this->getMockBuilder(RedirectFactory::class)
            ->disableOriginalConstructor()
            ->setMethods(['create'])
            ->getMock();
        $this->slideRepositoryMock = $this->getMockForAbstractClass(SlideRepositoryInterface::class);
        $this->messageManagerMock = $this->getMockForAbstractClass(ManagerInterface::class);
        $this->collectionFactoryMock = $this->getMockBuilder(CollectionFactory::class)
            ->disableOriginalConstructor()
            ->setMethods(['create'])
            ->getMock();
        $this->filterMock = $this->getMockBuilder(Filter::class)
            ->disableOriginalConstructor()
            ->setMethods(['getCollection'])
            ->getMock();
        $this->requestMock = $this->getMockBuilder(RequestInterface::class)->getMock();
        $contextMock = $objectManager->getObject(
            Context::class,
            [
                'request' => $this->requestMock,
                'messageManager' => $this->messageManagerMock,
                'resultRedirectFactory' => $this->resultRedirectFactoryMock
            ]
        );

        $this->controller = $objectManager->getObject(
            MassRemoveFromBanner::class,
            [
                'context' => $contextMock,
                'collectionFactory' => $this->collectionFactoryMock,
                'filter' => $this->filterMock,
                'slideRepository' => $this->slideRepositoryMock
            ]
        );
    }

    /**
     * Testing of execute method
     */
    public function testExecute()
    {
        $slideData = [
            'id' => 1,
            'banner_ids' => [
                0 => 1,
                1 => 2
            ]
        ];
        $bannerId = 1;
        $count = 1;

        $this->requestMock->expects($this->once())
            ->method('getParam')
            ->with('banner_id')
            ->willReturn($bannerId);
        $slideModelMock = $this->getMockBuilder(Slide::class)
            ->disableOriginalConstructor()
            ->setMethods(['getId'])
            ->getMock();
        $slideModelMock->expects($this->once())
            ->method('getId')
            ->willReturn($slideData['id']);
        $collectionMock = $this->getMockBuilder(Collection::class)
            ->disableOriginalConstructor()
            ->setMethods(['getItems'])
            ->getMock();
        $collectionMock->expects($this->once())
            ->method('getItems')
            ->willReturn([$slideModelMock]);
        $this->collectionFactoryMock->expects($this->once())
            ->method('create')
            ->willReturn($collectionMock);
        $this->filterMock->expects($this->once())
            ->method('getCollection')
            ->willReturn($collectionMock);

        $slideMock = $this->getMockForAbstractClass(SlideInterface::class);
        $slideMock->expects($this->once())
            ->method('getBannerIds')
            ->willReturn($slideData['banner_ids']);
        $slideMock->expects($this->once())
            ->method('setBannerIds')
            ->willReturn([1 => 2]);
        $this->slideRepositoryMock->expects($this->once())
            ->method('get')
            ->with($slideData['id'])
            ->willReturn($slideMock);
        $this->slideRepositoryMock->expects($this->once())
            ->method('save')
            ->with($slideMock)
            ->willReturn($slideMock);

        $this->messageManagerMock->expects($this->once())
            ->method('addSuccessMessage')
            ->with(__('A total of %1 record(s) have been updated', $count))
            ->willReturnSelf();

        $resultRedirectMock = $this->getMockBuilder(Redirect::class)
            ->disableOriginalConstructor()
            ->setMethods(['setPath'])
            ->getMock();
        $resultRedirectMock->expects($this->once())
            ->method('setPath')
            ->with('*/*/index')
            ->willReturnSelf();
        $this->resultRedirectFactoryMock->expects($this->once())
            ->method('create')
            ->willReturn($resultRedirectMock);

        $this->assertSame($resultRedirectMock, $this->controller->execute());
    }
}
