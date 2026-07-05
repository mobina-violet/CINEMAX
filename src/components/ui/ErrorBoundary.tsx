import { Component } from "react";
import type { ReactNode } from "react";

//کامپوننت مرز خطا کع اگر خطایی دیدم کل پروژه کرش نکنه فقط یه صفحع باز بشه
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  //static است یعنی به instance وابسته نیست.
  //وقتی خطایی در کامپوننت‌های فرزند رخ دهد، React این متد را به صورت خودکار فراخوانی می‌کند.
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 border border-cyan-500/30 rounded-full flex items-center justify-center">
              <span className="text-cyan-400 text-2xl">!</span>
            </div>
            <p className="text-cyan-400 font-medium">Something went wrong</p>
            <p className="text-white/40 text-sm">{this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-2 border border-cyan-500/30 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/10 transition-colors">
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children; // اگر خطایی نبود، همه چیز عادی نمایش داده شود
  }
}

export default ErrorBoundary;
