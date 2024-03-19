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
 * Condition interface
 * @api
 */
interface ConditionInterface extends \Magento\Framework\Api\ExtensibleDataInterface
{
    /**#@+
     * Constants for keys of data array. Identical to the name of the getter in snake case
     */
    const TYPE = 'type';
    const CONDITIONS = 'conditions';
    const AGGREGATOR = 'aggregator';
    const OPERATOR = 'operator';
    const ATTRIBUTE = 'attribute';
    const VALUE = 'value';
    const VALUE_TYPE = 'value_type';
    /**#@-*/

    /**
     * Get type
     *
     * @return string|null
     */
    public function getType();

    /**
     * Get conditions
     *
     * @return \Aheadworks\Rbslider\Api\Data\ConditionInterface[]|null
     */
    public function getConditions();

    /**
     * Get aggregator
     *
     * @return string|null
     */
    public function getAggregator();

    /**
     * Get operator
     *
     * @return string|null
     */
    public function getOperator();

    /**
     * Get attribute
     *
     * @return string|null
     */
    public function getAttribute();

    /**
     * Get value
     *
     * @return string
     */
    public function getValue();

    /**
     * Get value type
     *
     * @return string
     */
    public function getValueType();

    /**
     * Retrieve existing extension attributes object or create a new one
     *
     * @return \Aheadworks\Rbslider\Api\Data\ConditionExtensionInterface|null
     */
    public function getExtensionAttributes();

    /**
     * Set type
     *
     * @param string $type
     * @return $this
     */
    public function setType($type);

    /**
     * Set conditions
     *
     * @param \Aheadworks\Rbslider\Api\Data\ConditionInterface[]|null $conditions
     * @return $this
     */
    public function setConditions(array $conditions = null);

    /**
     * Set aggregator
     *
     * @param string $aggregator
     * @return $this
     */
    public function setAggregator($aggregator);

    /**
     * Set operator
     *
     * @param string $operator
     * @return $this
     */
    public function setOperator($operator);

    /**
     * Set attribute
     *
     * @param string $attribute
     * @return $this
     */
    public function setAttribute($attribute);

    /**
     * Set value
     *
     * @param string $value
     * @return $this
     */
    public function setValue($value);

    /**
     * Set value type
     *
     * @param string $valueType
     * @return $this
     */
    public function setValueType($valueType);

    /**
     * Set an extension attributes object
     *
     * @param \Aheadworks\Rbslider\Api\Data\ConditionExtensionInterface $extensionAttributes
     * @return $this
     */
    public function setExtensionAttributes(
        \Aheadworks\Rbslider\Api\Data\ConditionExtensionInterface $extensionAttributes
    );
}
