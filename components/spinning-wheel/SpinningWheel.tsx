export interface Props {
}

const SpinningWheel = () => {
  return (
    <div class="w-52 h-52 relative rounded-full">
      <div class="w-52 h-52 absolute" style={{ clip: "rect(0,100px,200px,0)" }}>
      </div>
      <div class="w-52 h-52 absolute" style={{ clip: "rect(0,100px,200px,0)" }}>
      </div>
      <div class="w-52 h-52 absolute" style={{ clip: "rect(0,100px,200px,0)" }}>
      </div>
    </div>
  );
};

export default SpinningWheel;
