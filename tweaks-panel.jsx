(function() {
  // 1. Hook for tweaks state
  function useTweaks(defaultValues) {
    const [tweaks, setTweaks] = React.useState(defaultValues);
    const setTweak = React.useCallback((key, value) => {
      setTweaks(prev => ({
        ...prev,
        [key]: value
      }));
    }, []);
    return [tweaks, setTweak];
  }

  // 2. TweaksPanel container with sleek styling and toggle support
  function TweaksPanel({ title, children }) {
    const [minimized, setMinimized] = React.useState(false);
    
    return (
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: minimized ? 'auto' : '280px',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.04)',
        padding: minimized ? '10px 14px' : '16px 20px',
        zIndex: 2147483000,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#1c1c1e',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: minimized ? '0' : '14px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none'
        }} onClick={() => setMinimized(!minimized)}>
          <div style={{
            fontSize: '13.5px',
            fontWeight: '700',
            letterSpacing: '-0.2px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: '#10B981',
              boxShadow: '0 0 8px #10B981'
            }}></span>
            {title}
          </div>
          <button style={{
            border: 'none',
            background: 'rgba(0,0,0,0.05)',
            fontSize: '11px',
            fontWeight: '600',
            color: 'rgba(60,60,67,0.6)',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '100px',
            outline: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s'
          }} onClick={(e) => { e.stopPropagation(); setMinimized(!minimized); }}>
            {minimized ? 'Hiện' : 'Ẩn'}
          </button>
        </div>
        {!minimized && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            {children}
          </div>
        )}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
      </div>
    );
  }

  // 3. Section divider
  function TweakSection({ label }) {
    return (
      <div style={{
        fontSize: '10px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
        color: 'rgba(60, 60, 67, 0.45)',
        marginTop: '6px',
        marginBottom: '2px',
        borderBottom: '1px solid rgba(0,0,0,0.04)',
        paddingBottom: '4px'
      }}>{label}</div>
    );
  }

  // 4. Color picker component
  function TweakColor({ label, value, options, onChange }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ fontSize: '12.5px', color: 'rgba(60, 60, 67, 0.8)', fontWeight: '500' }}>{label}</div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {options.map(color => {
            const isSelected = value === color;
            return (
              <button
                key={color}
                onClick={() => onChange(color)}
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: isSelected ? '2px solid #1c1c1e' : '2px solid transparent',
                  boxShadow: isSelected 
                    ? '0 0 0 1px #fff, 0 4px 10px rgba(0,0,0,0.15)' 
                    : '0 0 0 1px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  padding: 0,
                  outline: 'none',
                  transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), border 0.1s',
                  transform: isSelected ? 'scale(1.15)' : 'scale(1)'
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // 5. Select dropdown component
  function TweakSelect({ label, value, options, onChange }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ fontSize: '12.5px', color: 'rgba(60, 60, 67, 0.8)', fontWeight: '500' }}>{label}</div>
        <div style={{ position: 'relative', width: '100%' }}>
          <select
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 28px 6px 10px',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.08)',
              background: '#fff',
              fontSize: '12.5px',
              fontWeight: '500',
              fontFamily: 'inherit',
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              WebkitAppearance: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
            }}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            fontSize: '9px',
            color: 'rgba(60, 60, 67, 0.45)',
            fontWeight: '700'
          }}>▼</div>
        </div>
      </div>
    );
  }

  // 6. Segmented control component
  function TweakRadio({ label, value, options, onChange }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ fontSize: '12.5px', color: 'rgba(60, 60, 67, 0.8)', fontWeight: '500' }}>{label}</div>
        <div style={{
          display: 'flex',
          background: 'rgba(0,0,0,0.04)',
          padding: '2px',
          borderRadius: '9px',
          gap: '1px',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)'
        }}>
          {options.map(opt => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onChange(opt.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: isSelected ? '#fff' : 'transparent',
                  padding: '5px 0',
                  borderRadius: '7px',
                  fontSize: '12px',
                  fontWeight: isSelected ? '600' : '500',
                  color: isSelected ? '#1c1c1e' : 'rgba(60,60,67,0.6)',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.08), 0 1px 1px rgba(0,0,0,0.03)' : 'none',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                  outline: 'none'
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Expose to window for global access across script blocks
  window.useTweaks = useTweaks;
  window.TweaksPanel = TweaksPanel;
  window.TweakSection = TweakSection;
  window.TweakColor = TweakColor;
  window.TweakSelect = TweakSelect;
  window.TweakRadio = TweakRadio;
})();
