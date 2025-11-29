type Props = {
  title?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
};

export default function Card({ title, headerRight, children }: Props) {
  return (
    <div className="card">
      {(title || headerRight) && (
        <div className="card-header flex items-center justify-between">
          {title ? <div className="card-title">{title}</div> : <div />}
          {headerRight}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}