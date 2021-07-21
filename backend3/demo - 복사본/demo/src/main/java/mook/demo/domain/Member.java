package mook.demo.domain;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @NotEmpty
    @Length(min = 3, max = 15,message = "loginId는 최소 3글자 이상, 최대 15글자 이하 이어야 합니다.")
//    @Pattern(regexp = "^[a-z0-9_-]{3,15}$",message = "loginId는")
    @Pattern(regexp = "^[a-z0-9_-]$",message = "loginId는 영어와 숫자만 가능합니다.")
    private String loginId;

    @NotEmpty
    @Length(min = 8, max = 20,message = "비밀번호는 8자리이상 20자리 이하 이어야 합니다.")
    private String password;

    @NotEmpty
    @Length(min = 3, max = 10, message = "이름은 최소 3글자 이상, 최대 10글자 이하이어야 합니다.")
//    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9_-]{3,10}$")
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9_-]$",message = "이름에는 특수문자가 들어가면 안됩니다.")
    private String name;

}
