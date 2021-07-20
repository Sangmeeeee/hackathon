package mook.demo.api;

import lombok.RequiredArgsConstructor;
import mook.demo.apiresult.ApiResponseMessage;
import mook.demo.domain.Member;
import mook.demo.dto.LoginForm;
import mook.demo.service.LoginService;
import mook.demo.session.SessionConst;
import mook.demo.session.SessionManager;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class LoginApiController {

    private final LoginService loginService;
    private final SessionManager sessionManager;

    @PostMapping("/api/login")
    public ApiResponseMessage login(@Valid @RequestBody LoginForm form, BindingResult bindingResult,
                                    HttpServletRequest request){
        ApiResponseMessage apiResponseMessage = new ApiResponseMessage();
        if (bindingResult.hasErrors()) {
            apiResponseMessage.setStatus("failed");
            apiResponseMessage.setMessage("로그인에 실패했습니다.");
            apiResponseMessage.setErrorMessage(bindingResult.getObjectName());
            apiResponseMessage.setErrorCode(bindingResult.toString());
            return apiResponseMessage;
        }
        Member loginMember = loginService.login(form.getLoginId(), form.getPassword());

        if(loginMember == null){
            bindingResult.reject("loginFail", "아이디 또는 비밀번호가 맞지 않습니다.");
            apiResponseMessage.setStatus("failed");
            apiResponseMessage.setErrorMessage("아이디 또는 비밀번호가 맞지 않습니다.");
            apiResponseMessage.setErrorCode("loginFail");
            return apiResponseMessage;
        }

        HttpSession session = request.getSession();
        session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);
        apiResponseMessage.setStatus("success");
        apiResponseMessage.setMessage("로그인에 성공했습니다.");
        return apiResponseMessage;
    }

    @PostMapping("/api/logout")
    public ApiResponseMessage logout(HttpServletRequest request) {
        ApiResponseMessage apiResponseMessage = new ApiResponseMessage();
        //세션을 삭제한다.
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        apiResponseMessage.setStatus("success");
        apiResponseMessage.setMessage("세션을 삭제하고, 로그아웃 했습니다.");
        return apiResponseMessage;
    }
}
