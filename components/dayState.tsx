import Image from "next/image";



function DayState( { day }: {day: boolean | undefined }) {
  let image: [string, string, number?] = ['/images/gray-circle.svg', 'Gray circle icon', 12];
  
  

  if (day === true) image = ['/images/check.svg', 'Green circle icon', 24];
  if (day === false) image = ['/images/x.svg', 'Red circle icon', 24];
  
  const [src, alt, size] = image;
  return (
    <div className="flex items-center justify-center h-9">
      <Image 
      src={src} 
      alt={alt} 
      width={size}
      height={size}
      />
    </div>
  )
}

export default DayState;