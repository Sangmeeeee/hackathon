package mook.demo.api;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import mook.demo.apiresult.ApiResponseMessage;
import mook.demo.domain.Member;
import mook.demo.repository.MemberRepository;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberRepository memberRepository;

    @PostMapping("/api/member/add")
    public ApiResponseMessage save(@Valid @RequestBody Member member, BindingResult result){

        ApiResponseMessage apiResponseMessage = new ApiResponseMessage();

        if (result.hasErrors()) {
            apiResponseMessage.setStatus("failed");
            apiResponseMessage.setMessage("회원가입을 하는 도중 오류가 발생했습니다.");
            return apiResponseMessage;
        }

        memberRepository.save(member);
        apiResponseMessage.setStatus("success");
        apiResponseMessage.setMessage("회원가입을 성공적으로 완료했습니다.");
        return apiResponseMessage;
    }
//    @PostMapping("/api/v2/members")
//    public CreateMemberResponse saveMemberV2(@RequestBody @Valid
//                                                     CreateMemberRequest request) {
//        Member member = new Member();
//        member.setName(request.getName());
//        Long id = memberService.join(member);
//        return new CreateMemberResponse(id);
//    }

    @Data
    static class CreateMemberRequest{
        private String name;
    }

    @Data
    static class CreateMemberResponse{
        private Long id;

        public CreateMemberResponse(Long id){
            this.id = id;
        }
    }

}

