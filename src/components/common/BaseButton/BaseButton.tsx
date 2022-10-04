import { FC, ReactElement } from 'react';
import c from 'classnames';
import styles from './BaseButton.module.scss';

interface Props {
  text?: string;
  type?: string;
  testId?: string;
  marginRightIcon?: number;
  small?: boolean;
  linkURL?: string;
  large?: boolean;
  medium?: boolean;
  fontSize?: number;
  success?: boolean;
  isSelected?: boolean;
  keyPress?: string;
  onClick?: Function;
  icon?: ReactElement;
  disabled?: boolean;
  marginTop?: number;
  marginRight?: number;
  isLoading?: boolean;
  marginBottom?: number;
  transparent?: boolean;
  isButtonLink?: boolean;
  backgroundColor?: string;
}

const BaseButton: FC<Props> = ({
  text = '',
  type = '',
  testId = '',
  icon = null,
  linkURL = '',
  fontSize = 16,
  small = false,
  keyPress = '',
  backgroundColor = '',
  marginRightIcon = '',
  large = false,
  marginTop = 0,
  medium = false,
  success = false,
  isSelected = false,
  marginRight = 0,
  marginBottom = 0,
  disabled = false,
  isLoading = false,
  onClick = () => {},
  isButtonLink = false,
}) => {
  const click = () => {
    if (isLoading || disabled) {
      return;
    }
    onClick();
  };

  const handleKeyPress = (e: any) => {
    if (e.key === keyPress) {
      return onClick();
    }
  };

  if (isButtonLink) {
    return (
      <a
        href={linkURL}
        target="_blank"
        rel="noreferrer"
        data-testid={`button-link-${testId}`}
        className={c(
          styles.isButtonLink,
          small && styles.small,
          large && styles.large,
          medium && styles.medium,
          icon && styles.iconContainer,
        )}
        style={{ marginTop, marginBottom, fontSize, marginRight }}
      >
        <div className={styles.icon}>{icon}</div>
        <div className={styles.linkText}>{text}</div>
      </a>
    );
  }

  return (
    <button
      tabIndex={0}
      onClick={click}
      disabled={disabled}
      onKeyPress={handleKeyPress}
      data-testid={`button-${testId}`}
      className={c(
        styles.button,
        icon && styles.icon,
        small && styles.small,
        large && styles.large,
        medium && styles.medium,
        isSelected && styles.isSelected,
        success && styles.buttonStateSuccess,
        disabled && styles.buttonStateDisabled,
      )}
      style={{ marginTop, marginBottom, backgroundColor }}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      {icon && (
        <div style={{ marginRight: marginRightIcon }} className={styles.icon}>
          {icon}
        </div>
      )}
      <div className={styles.text}>{text}</div>
    </button>
  );
};

export default BaseButton;
