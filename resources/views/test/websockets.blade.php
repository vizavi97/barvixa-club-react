websockets.blade

@php
    $jwtToken = 0;
    if(Admin::user()){
        $jwtToken = auth()->tokenById(Admin::user()->id);
    }
@endphp

<input type="hidden" name="jwtToken" value="{{ $jwtToken }}">
<a href="javascript:" id="testWS">testWS</a>




<script src="/echo/echo.js"></script>
