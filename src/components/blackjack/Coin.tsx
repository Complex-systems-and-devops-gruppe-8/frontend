import '../../Styling/blackjack/Coin.css';

interface CoinProps {
    color: string;
    value: number;
    onLeftClick?: () => void;
    onRightClick?: () => void;
    size?: number;
}

//size is the scale of which the coin will be displayed
function Coin({ color, value, onLeftClick, onRightClick, size = 1 }: CoinProps) {
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault(); // Prevent default actions like context menu
    
        if (event.button === 0 && onLeftClick) {
          // Left Click (button 0)
          onLeftClick();
        } else if (event.button === 2 && onRightClick) {
          // Right Click (button 2)
          onRightClick();
        }
      };
     // Dynamically generate the radial gradient based on the color prop
  const gradientBackground = `radial-gradient(circle at 50% 50%, ${color}, ${ color}99)`;
  return (
    <div className="coin"   style={{
        background: gradientBackground, // Set the gradient background
        border: `${size*25}px dashed ${ color}`, // Set border color
        width: `${size*80}px`,
        height: `${size*80}px`,
        fontSize: `${size*25}px`
      }}
      onMouseDown={handleClick} // Use onMouseDown for left-click and right-click
      onContextMenu={(e) => e.preventDefault()} // Prevent default right-click menu
    >
        <div className="coin_text">{ value}</div>
    </div>
  );
}
export default Coin;