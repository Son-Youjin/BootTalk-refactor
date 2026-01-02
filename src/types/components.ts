export interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  /**
   * 모달 크기 (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, full)
   * @default 'md'
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
  footer?: React.ReactNode;
  /**
   * 배경 클릭시 닫기 활성화 여부
   * @default true
   */
  closeOnOutsideClick?: boolean;
  /**
   * ESC 키로 닫기 활성화 여부
   * @default true
   */
  closeOnEsc?: boolean;
  className?: string;
  /**
   * 모달 헤더 숨김 여부
   * @default false
   */
  hideHeader?: boolean;
}
